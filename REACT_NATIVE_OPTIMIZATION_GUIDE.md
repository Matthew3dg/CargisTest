# Руководство по оптимизации React Native

## Содержание
1. [Оптимизация рендеринга](#оптимизация-рендеринга)
2. [Оптимизация списков](#оптимизация-списков)
3. [Оптимизация изображений](#оптимизация-изображений)
4. [Оптимизация навигации](#оптимизация-навигации)
5. [Оптимизация состояния](#оптимизация-состояния)
6. [Оптимизация сети](#оптимизация-сети)
7. [Оптимизация сборки](#оптимизация-сборки)
8. [Мониторинг производительности](#мониторинг-производительности)

---

## Оптимизация рендеринга

### 1. React.memo для функциональных компонентов

**Проблема**: Компоненты перерендериваются даже когда их пропсы не изменились.

**Решение**: Используйте `React.memo` для предотвращения ненужных перерендеров.

```tsx
// ❌ Плохо - компонент перерендеривается при каждом обновлении родителя
const CollapsibleOrderItem = ({ id, order_number, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Text>{order_number}</Text>
    </TouchableOpacity>
  );
};

// ✅ Хорошо - компонент перерендеривается только при изменении пропсов
const CollapsibleOrderItem = React.memo(({ id, order_number, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Text>{order_number}</Text>
    </TouchableOpacity>
  );
});

// ✅ Еще лучше - с кастомной функцией сравнения
const CollapsibleOrderItem = React.memo(
  ({ id, order_number, onPress }) => {
    return (
      <TouchableOpacity onPress={() => onPress(id)}>
        <Text>{order_number}</Text>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.order_number === nextProps.order_number
    );
  }
);
```

### 2. useMemo для дорогих вычислений

**Проблема**: Сложные вычисления выполняются при каждом рендере.

**Решение**: Используйте `useMemo` для кэширования результатов вычислений.

```tsx
// ❌ Плохо - фильтрация выполняется при каждом рендере
const OrdersList = ({ orders, filter }) => {
  const filteredOrders = orders.filter(order => 
    order.status === filter
  );
  
  return (
    <FlatList
      data={filteredOrders}
      renderItem={renderOrder}
    />
  );
};

// ✅ Хорошо - фильтрация выполняется только при изменении orders или filter
const OrdersList = ({ orders, filter }) => {
  const filteredOrders = useMemo(() => 
    orders.filter(order => order.status === filter),
    [orders, filter]
  );
  
  return (
    <FlatList
      data={filteredOrders}
      renderItem={renderOrder}
    />
  );
};
```

### 3. useCallback для функций

**Проблема**: Функции создаются заново при каждом рендере, что приводит к перерендеру дочерних компонентов.

**Решение**: Используйте `useCallback` для мемоизации функций.

```tsx
// ❌ Плохо - функция создается при каждом рендере
const OrdersList = () => {
  const onDetailsPress = (id: number) => {
    orders.getOrderDetails(id).then(() => navigation.navigate('OrderDetails'));
  };

  return (
    <FlatList
      data={orders.ordersList}
      renderItem={({ item }) => (
        <CollapsibleOrderItem
          {...item}
          onPress={onDetailsPress} // Новая функция при каждом рендере
        />
      )}
    />
  );
};

// ✅ Хорошо - функция мемоизирована
const OrdersList = () => {
  const onDetailsPress = useCallback((id: number) => {
    orders.getOrderDetails(id).then(() => navigation.navigate('OrderDetails'));
  }, [navigation]);

  const renderOrder = useCallback(({ item }: RenderOrdersProps) => (
    <CollapsibleOrderItem
      {...item}
      onPress={onDetailsPress}
    />
  ), [onDetailsPress]);

  return (
    <FlatList
      data={orders.ordersList}
      renderItem={renderOrder}
    />
  );
};
```

---

## Оптимизация списков

### 1. FlatList оптимизации

**Проблема**: Неэффективный рендеринг больших списков.

**Решение**: Настройте FlatList для оптимальной производительности.

```tsx
// ✅ Оптимизированный FlatList
<FlatList
  data={orders.ordersList}
  renderItem={renderOrder}
  keyExtractor={item => item.id.toString()}
  
  // Оптимизация производительности
  removeClippedSubviews={true} // Удаляет невидимые элементы из памяти
  maxToRenderPerBatch={10} // Количество элементов для рендера за раз
  updateCellsBatchingPeriod={50} // Задержка между батчами (мс)
  initialNumToRender={10} // Количество элементов для первоначального рендера
  windowSize={10} // Размер окна рендеринга
  
  // Оптимизация скролла
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT, // Фиксированная высота элемента
    offset: ITEM_HEIGHT * index,
    index,
  })}
  
  // Виртуализация
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  
  // Оптимизация обновлений
  extraData={orders.ordersList.length} // Принудительное обновление при изменении данных
/>
```

### 2. Виртуализация для больших списков

```tsx
// Для очень больших списков используйте react-native-super-grid
import { FlatGrid } from 'react-native-super-grid';

// Или react-native-windowed-list для кастомной виртуализации
import { WindowedList } from 'react-native-windowed-list';
```

### 3. Оптимизация renderItem

```tsx
// ❌ Плохо - создание компонента при каждом рендере
const renderOrder = ({ item }) => (
  <CollapsibleOrderItem {...item} />
);

// ✅ Хорошо - мемоизированный компонент
const OrderItem = React.memo(({ item }) => (
  <CollapsibleOrderItem {...item} />
));

const renderOrder = useCallback(({ item }) => (
  <OrderItem item={item} />
), []);
```

---

## Оптимизация изображений

### 1. Оптимизация размера изображений

```tsx
// ❌ Плохо - большие изображения
<Image 
  source={{ uri: 'https://example.com/large-image.jpg' }}
  style={{ width: 100, height: 100 }}
/>

// ✅ Хорошо - оптимизированные изображения
<Image 
  source={{ 
    uri: 'https://example.com/optimized-image.jpg',
    width: 200, // Указывайте размеры для оптимизации
    height: 200,
  }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
  // Кэширование
  cache="force-cache"
/>
```

### 2. Ленивая загрузка изображений

```tsx
import { LazyImage } from 'react-native-lazy-image';

const OptimizedImage = ({ uri, style }) => (
  <LazyImage
    source={{ uri }}
    style={style}
    placeholder={<ActivityIndicator />}
    error={<Text>Ошибка загрузки</Text>}
  />
);
```

### 3. Использование WebP формата

```tsx
// В metro.config.js добавьте поддержку WebP
module.exports = {
  resolver: {
    assetExts: ['bin', 'txt', 'jpg', 'png', 'json', 'webp'],
  },
};
```

---

## Оптимизация навигации

### 1. Ленивая загрузка экранов

```tsx
// ❌ Плохо - все экраны загружаются сразу
import OrdersList from '../screens/OrdersList';
import OrderDetails from '../screens/OrderDetails';

// ✅ Хорошо - ленивая загрузка
const OrdersList = lazy(() => import('../screens/OrdersList'));
const OrderDetails = lazy(() => import('../screens/OrderDetails'));

// В навигаторе
<Stack.Screen 
  name="OrdersList" 
  component={OrdersList}
  options={{ lazy: true }}
/>
```

### 2. Оптимизация переходов

```tsx
// В StackNavigator
<Stack.Navigator
  screenOptions={{
    // Оптимизация анимаций
    animation: 'slide_from_right',
    animationDuration: 200,
    
    // Оптимизация памяти
    detachPreviousScreen: true,
    
    // Оптимизация рендеринга
    freezeOnBlur: true,
  }}
>
```

### 3. Мемоизация параметров навигации

```tsx
const navigationOptions = useMemo(() => ({
  headerTitle: 'Заявки на перевозки',
  headerStyle: {
    backgroundColor: '#ffffff',
  },
}), []);
```

---

## Оптимизация состояния

### 1. Оптимизация MobX

```tsx
// ❌ Плохо - избыточные наблюдения
class Order {
  ordersList: OrderItem[] = [];
  totalPagesCount: number = 0;
  isLoading: boolean = false;
  
  // Все поля наблюдаются, даже если не используются
}

// ✅ Хорошо - селективные наблюдения
class Order {
  @observable ordersList: OrderItem[] = [];
  @observable totalPagesCount: number = 0;
  @observable isLoading: boolean = false;
  
  // Только нужные поля помечены как observable
}

// ✅ Еще лучше - computed для производных значений
class Order {
  @observable ordersList: OrderItem[] = [];
  @observable filter: string = 'all';
  
  @computed get filteredOrders() {
    if (this.filter === 'all') return this.ordersList;
    return this.ordersList.filter(order => order.status === this.filter);
  }
}
```

### 2. Оптимизация SWR

```tsx
// ❌ Плохо - избыточные запросы
const { data, error, isLoading } = useSWR(
  currentPage.toString(),
  getList,
  {
    refreshInterval: 1000, // Слишком часто
  }
);

// ✅ Хорошо - оптимизированная конфигурация
const { data, error, isLoading } = useSWR(
  currentPage.toString(),
  getList,
  {
    refreshInterval: 30000, // 30 секунд
    revalidateOnFocus: false, // Не обновлять при фокусе
    revalidateOnReconnect: true, // Обновлять при восстановлении соединения
    dedupingInterval: 2000, // Дедупликация запросов
    errorRetryCount: 3, // Количество повторных попыток
    errorRetryInterval: 5000, // Интервал между попытками
  }
);
```

### 3. Разделение состояния

```tsx
// ❌ Плохо - все в одном store
class AppStore {
  orders: OrderItem[] = [];
  user: User = {};
  settings: Settings = {};
  // ... много других полей
}

// ✅ Хорошо - разделенные stores
class OrdersStore {
  orders: OrderItem[] = [];
  // Только логика заказов
}

class UserStore {
  user: User = {};
  // Только логика пользователя
}

class SettingsStore {
  settings: Settings = {};
  // Только настройки
}
```

---

## Оптимизация сети

### 1. Кэширование запросов

```tsx
// Используйте react-query для продвинутого кэширования
import { useQuery, useMutation, useQueryClient } from 'react-query';

const useOrders = (page: number) => {
  return useQuery(
    ['orders', page],
    () => getOrdersList(page.toString()),
    {
      staleTime: 5 * 60 * 1000, // 5 минут
      cacheTime: 10 * 60 * 1000, // 10 минут
      keepPreviousData: true, // Сохранять предыдущие данные
    }
  );
};
```

### 2. Оптимизация HTTP запросов

```tsx
// В http/index.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавьте интерцепторы для оптимизации
api.interceptors.request.use(
  (config) => {
    // Добавьте кэширование для GET запросов
    if (config.method === 'get') {
      config.headers['Cache-Control'] = 'max-age=300'; // 5 минут
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Retry логика
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
      return api(originalRequest);
    }
    
    return Promise.reject(error);
  }
);
```

### 3. Пагинация и виртуализация

```tsx
// Оптимизированная пагинация
const useInfiniteOrders = () => {
  return useInfiniteQuery(
    'orders',
    ({ pageParam = 0 }) => getOrdersList(pageParam.toString()),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length : undefined;
      },
      staleTime: 5 * 60 * 1000,
    }
  );
};
```

---

## Оптимизация сборки

### 1. Metro конфигурация

```javascript
// metro.config.js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // Включить inline requires
      },
    }),
    // Оптимизация для продакшена
    minifierConfig: {
      mangle: true,
      keep_fnames: true,
    },
  },
  resolver: {
    // Оптимизация разрешения модулей
    alias: {
      '@': './src',
      '@components': './src/components',
      '@screens': './src/screens',
    },
  },
  // Оптимизация кэша
  cacheStores: [
    {
      name: 'metro-cache',
      type: 'file',
      options: {
        path: './metro-cache',
      },
    },
  ],
};
```

### 2. Babel конфигурация

```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Оптимизация импортов
    ['import', {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }, 'lodash'],
    
    // Оптимизация для продакшена
    process.env.NODE_ENV === 'production' && [
      'transform-remove-console',
      { exclude: ['error', 'warn'] }
    ],
  ].filter(Boolean),
};
```

### 3. Оптимизация bundle size

```bash
# Анализ размера bundle
npx react-native-bundle-visualizer

# Удаление неиспользуемого кода
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --analyze
```

---

## Мониторинг производительности

### 1. Flipper интеграция

```tsx
// В App.tsx
import { Flipper } from 'react-native-flipper';

const App = () => {
  return (
    <Flipper>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Flipper>
  );
};
```

### 2. Performance мониторинг

```tsx
import { Performance } from 'react-native-performance';

// Измерение времени рендеринга
const measureRenderTime = (componentName: string) => {
  const start = Performance.now();
  
  return () => {
    const end = Performance.now();
    console.log(`${componentName} render time: ${end - start}ms`);
  };
};

// Использование
const OrdersList = () => {
  const endMeasure = measureRenderTime('OrdersList');
  
  useEffect(() => {
    endMeasure();
  });
  
  // ... компонент
};
```

### 3. Memory мониторинг

```tsx
import { MemoryInfo } from 'react-native-memory-info';

const checkMemoryUsage = () => {
  MemoryInfo.getMemoryInfo().then((info) => {
    console.log('Memory usage:', info);
  });
};
```

---

## Практические рекомендации

### 1. Приоритеты оптимизации

1. **Высокий приоритет**:
   - Оптимизация FlatList
   - Мемоизация компонентов
   - Оптимизация изображений

2. **Средний приоритет**:
   - Оптимизация состояния
   - Кэширование запросов
   - Оптимизация навигации

3. **Низкий приоритет**:
   - Микрооптимизации
   - Продвинутые техники

### 2. Измерение производительности

```tsx
// Профилирование компонентов
const ProfiledComponent = () => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  console.log(`Component rendered ${renderCount.current} times`);
  
  return <View />;
};
```

### 3. Инструменты для анализа

- **Flipper** - отладка и профилирование
- **React DevTools** - анализ компонентов
- **Chrome DevTools** - анализ JavaScript
- **Xcode Instruments** - анализ iOS
- **Android Studio Profiler** - анализ Android

---

## Заключение

Оптимизация React Native приложения - это итеративный процесс. Начните с самых критичных мест (списки, изображения, рендеринг) и постепенно переходите к более тонким оптимизациям. Всегда измеряйте производительность до и после изменений, чтобы убедиться в их эффективности.

Помните: преждевременная оптимизация может усложнить код без заметной пользы. Сначала убедитесь, что у вас есть реальные проблемы с производительностью, а затем применяйте соответствующие решения.