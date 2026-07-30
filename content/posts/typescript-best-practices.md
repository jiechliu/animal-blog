---
title: TypeScript 最佳实践：写出更安全的代码
slug: typescript-best-practices
date: 2025-11-08
cover: https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1400&q=85
category: 前端手札
tags:
  - TypeScript
  - JavaScript
  - 类型安全
  - 最佳实践
description: 掌握 TypeScript 的核心概念和最佳实践，学会使用类型系统来提升代码质量和开发效率。
draft: false
---

TypeScript 为 JavaScript 带来了静态类型检查，让我们能够在编译时发现错误，提升代码的可维护性和可靠性。

## 🎯 基础类型使用

### 基本类型定义
```typescript
// 基础类型
const name: string = "张三";
const age: number = 25;
const isActive: boolean = true;

// 数组类型
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// 对象类型
interface User {
  id: number;
  name: string;
  email?: string; // 可选属性
  readonly createdAt: Date; // 只读属性
}
```

### 联合类型和交叉类型
```typescript
// 联合类型
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// 交叉类型
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

type UserWithTimestamp = User & Timestamped;
```

## 🔧 高级类型技巧

### 泛型的使用
```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

### 实用工具类型
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - 使所有属性可选
type PartialUser = Partial<User>;

// Pick - 选择特定属性
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit - 排除特定属性
type CreateUser = Omit<User, 'id'>;

// Required - 使所有属性必需
type RequiredUser = Required<PartialUser>;
```

## 📝 最佳实践

### 1. 严格的类型检查
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### 2. 使用类型断言谨慎
```typescript
// ❌ 避免使用 any
const data: any = response.data;

// ❌ 过度使用类型断言
const user = data as User;

// ✅ 使用类型守卫
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

if (isUser(data)) {
  // TypeScript 知道这里 data 是 User 类型
  console.log(data.name);
}
```

### 3. 合理使用枚举
```typescript
// ✅ 使用 const 枚举提升性能
const enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

// ✅ 或使用联合类型
type Color = "red" | "green" | "blue";
```

## 🚀 在 React 中使用 TypeScript

### 组件类型定义
```typescript
import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Hooks 类型定义
```typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

// 自定义 Hook
function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}
```

## 🛠️ API 层类型安全

### 定义 API 响应类型
```typescript
// API 响应类型
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API 服务
class UserService {
  static async getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    const result: ApiResponse<User> = await response.json();
    
    if (result.status === 'error') {
      throw new Error(result.message || 'Failed to fetch user');
    }
    
    return result.data;
  }

  static async getUsers(page: number = 1): Promise<PaginatedResponse<User>> {
    const response = await fetch(`/api/users?page=${page}`);
    return response.json();
  }
}
```

## ⚡ 性能优化

### 类型导入优化
```typescript
// ✅ 使用 type-only 导入
import type { User } from './types';
import type { FC } from 'react';

// ✅ 分离类型导入和值导入
import { useState } from 'react';
import type { ChangeEvent } from 'react';
```

### 避免过度类型化
```typescript
// ❌ 过度复杂的类型
type ComplexType<T, U, V> = T extends U ? V extends string ? T : never : U;

// ✅ 简单明了的类型
type UserRole = 'admin' | 'user' | 'guest';
```

## 🔍 调试和工具

### 使用 TypeScript 编译器 API
```typescript
// 类型检查工具函数
function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error('Expected number');
  }
}

// 使用
function processValue(value: unknown) {
  assertIsNumber(value);
  // 这里 TypeScript 知道 value 是 number 类型
  return value * 2;
}
```

### 配置开发工具
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

## 📚 总结

TypeScript 最佳实践要点：

1. **启用严格模式** - 获得最大的类型安全保障
2. **合理使用泛型** - 提升代码复用性
3. **避免 any 类型** - 使用类型守卫和断言
4. **利用工具类型** - Partial、Pick、Omit 等
5. **类型导入优化** - 区分类型和值的导入
6. **组件类型定义** - 为 React 组件提供完整的类型支持

掌握这些实践，你就能写出更安全、更可维护的 TypeScript 代码！
