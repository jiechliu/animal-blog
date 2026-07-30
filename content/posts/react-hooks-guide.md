---
title: React Hooks 完全指南：从入门到精通
slug: react-hooks-guide
date: 2025-11-08
cover: https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=1400&q=85
category: 前端手札
tags:
  - React
  - Hooks
  - JavaScript
  - 前端框架
description: 深入理解 React Hooks 的工作原理，掌握常用 Hooks 的使用技巧，学会创建自定义 Hooks 来提升代码复用性。
draft: false
---

React Hooks 是 React 16.8 引入的新特性，它让我们可以在函数组件中使用状态和其他 React 特性。本文将深入探讨 Hooks 的使用方法和最佳实践。

## 🎯 为什么需要 Hooks？

在 Hooks 出现之前，函数组件被称为"无状态组件"，只能接收 props 并返回 JSX。如果需要状态管理或生命周期方法，就必须使用类组件。

### 类组件的问题
- 代码复杂度高
- 难以复用状态逻辑
- 生命周期方法中逻辑分散
- this 绑定问题

## 📚 常用 Hooks 详解

### useState - 状态管理

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
```

**关键要点：**
- 初始状态只在首次渲染时使用
- setState 是异步的
- 可以传入函数来基于前一个状态更新

### useEffect - 副作用处理

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('获取用户信息失败:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // 依赖数组

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>用户不存在</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### useContext - 上下文消费

```jsx
import React, { useContext, createContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}

function Header() {
  const theme = useContext(ThemeContext);
  return (
    <header className={`theme-${theme}`}>
      <h1>我的应用</h1>
    </header>
  );
}
```

### useReducer - 复杂状态管理

```jsx
import React, { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };

  return (
    <div>
      {/* Todo 应用 UI */}
    </div>
  );
}
```

## 🔧 自定义 Hooks

自定义 Hooks 让我们可以提取组件逻辑到可复用的函数中。

### useLocalStorage

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('读取 localStorage 失败:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('写入 localStorage 失败:', error);
    }
  };

  return [storedValue, setValue];
}

// 使用示例
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </div>
  );
}
```

### useFetch

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 使用示例
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## ⚡ 性能优化

### useMemo

```jsx
import React, { useMemo } from 'react';

function ExpensiveList({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('过滤计算执行');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback

```jsx
import React, { useCallback, useState } from 'react';

function TodoList({ todos }) {
  const [filter, setFilter] = useState('');

  const handleToggle = useCallback((id) => {
    // 处理切换逻辑
  }, []);

  const handleDelete = useCallback((id) => {
    // 处理删除逻辑
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## 📋 Hooks 使用规则

### 1. 只在顶层调用 Hooks
```jsx
// ✅ 正确
function MyComponent() {
  const [count, setCount] = useState(0);
  
  return <div>{count}</div>;
}

// ❌ 错误
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0); // 不要在条件语句中调用
  }
}
```

### 2. 只在 React 函数中调用 Hooks
```jsx
// ✅ 正确 - 在函数组件中
function MyComponent() {
  const [state, setState] = useState();
  return <div />;
}

// ✅ 正确 - 在自定义 Hook 中
function useCustomHook() {
  const [state, setState] = useState();
  return state;
}

// ❌ 错误 - 在普通函数中
function regularFunction() {
  const [state, setState] = useState(); // 不要在普通函数中调用
}
```

## 🎯 最佳实践

### 1. 合理拆分状态
```jsx
// ❌ 不推荐 - 将所有状态放在一个对象中
const [state, setState] = useState({
  name: '',
  email: '',
  age: 0,
  loading: false
});

// ✅ 推荐 - 按逻辑分组拆分状态
const [userInfo, setUserInfo] = useState({ name: '', email: '', age: 0 });
const [loading, setLoading] = useState(false);
```

### 2. 优化依赖数组
```jsx
// ❌ 缺少依赖
useEffect(() => {
  fetchUser(userId);
}, []); // userId 变化时不会重新执行

// ✅ 包含所有依赖
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### 3. 避免不必要的重渲染
```jsx
// 使用 React.memo 包装子组件
const ChildComponent = React.memo(({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // 使用 useCallback 缓存函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
  }, []);

  return (
    <div>
      <p>{count}</p>
      <ChildComponent title="点击我" onClick={handleClick} />
    </div>
  );
}
```

## 🚀 总结

React Hooks 为函数组件带来了强大的能力：

- **useState** - 简单状态管理
- **useEffect** - 处理副作用
- **useContext** - 消费上下文
- **useReducer** - 复杂状态管理
- **useMemo/useCallback** - 性能优化
- **自定义 Hooks** - 逻辑复用

掌握这些 Hooks 的使用技巧和最佳实践，能够让你写出更简洁、更易维护的 React 代码。

记住 Hooks 的两个基本规则，合理组织状态和副作用，你就能充分发挥 Hooks 的威力！
