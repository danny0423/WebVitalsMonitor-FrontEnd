# VitalMetrics 組件文檔

本專案已將設計稿中的所有組件轉換為 TypeScript + React (TSX) 組件。

## 📁 專案結構

```
src/
├── components/           # 可重用組件
│   ├── Button/          # 按鈕組件
│   ├── Input/           # 輸入框組件
│   ├── Badge/           # 徽章組件
│   ├── MetricCard/      # 指標卡片組件
│   ├── DataTable/       # 數據表格組件
│   └── index.ts         # 統一導出
│
├── pages/               # 頁面組件
│   ├── LoginPage/       # 登入頁面
│   └── DashboardPage/   # 儀表板頁面
│
├── styles/              # 全局樣式
│   ├── _variables.scss  # SCSS 變數
│   ├── _mixins.scss     # SCSS Mixins
│   └── global.scss      # 全局樣式
│
└── App.tsx              # 應用路由配置
```

## 🎨 樣式系統

### 變數 (_variables.scss)
- **色彩系統**：主色、中性色、語意色（success/warning/error）
- **字體系統**：字體家族、大小、粗細、行高
- **間距系統**：基於 4px 的間距尺度
- **斷點**：響應式設計斷點

### Mixins (_mixins.scss)
- 響應式 mixin (sm/md/lg/xl)
- Flex 快捷方式 (flex-center/flex-between)
- 卡片陰影
- 文字截斷

## 🧩 組件說明

### 基礎 UI 組件

#### Button
**位置**: `src/components/Button/`

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  // 繼承所有原生 button 屬性
}
```

**使用範例**:
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

#### Input
**位置**: `src/components/Input/`

**Props**:
```typescript
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  // 繼承所有原生 input 屬性
}
```

**使用範例**:
```tsx
<Input
  label="Email"
  type="email"
  placeholder="name@company.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  fullWidth
/>
```

#### Badge
**位置**: `src/components/Badge/`

**Props**:
```typescript
interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gray';
  children: React.ReactNode;
}
```

**使用範例**:
```tsx
<Badge variant="success">Good</Badge>
<Badge variant="warning">Needs Improvement</Badge>
<Badge variant="error">Poor</Badge>
```

### 業務組件

#### MetricCard
**位置**: `src/components/MetricCard/`

**Props**:
```typescript
type MetricStatus = 'good' | 'needs-improvement' | 'poor';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: MetricStatus;
  statusLabel?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: string;
  };
}
```

**使用範例**:
```tsx
<MetricCard
  title="LCP"
  value="1.2"
  unit="s"
  status="good"
  trend={{
    direction: 'down',
    value: '-0.3s from last week',
  }}
/>
```

**特點**:
- 根據 status 自動顯示不同顏色（綠色/橙色/紅色）
- 支持趨勢指標（上升/下降/穩定）
- 漸變背景和左側色條設計

#### DataTable
**位置**: `src/components/DataTable/`

**Props**:
```typescript
interface PageMetric {
  page: string;
  lcp: number;
  inp: number;
  cls: number;
  status: MetricStatus;
}

interface DataTableProps {
  data: PageMetric[];
}
```

**使用範例**:
```tsx
<DataTable
  data={[
    {
      page: '/home',
      lcp: 1.2,
      inp: 350,
      cls: 0.42,
      status: 'poor',
    },
    // ...more data
  ]}
/>
```

**特點**:
- 自動根據數值判斷指標狀態顏色
- 顯示頁面數量徽章
- 響應式表格設計

## 📄 頁面組件

### LoginPage
**位置**: `src/pages/LoginPage/`

**路由**: `/login`

**功能**:
- 左右分欄佈局
- 左側品牌展示區（藍色漸變背景）
- 右側登入表單
- 包含 Email/Password 輸入
- 密碼顯示/隱藏切換
- "Forgot password?" 鏈接
- "Sign up" 註冊鏈接
- 登入後導航到 Dashboard

**響應式**:
- 桌面版：左右分欄
- 移動版：上下堆疊

### DashboardPage
**位置**: `src/pages/DashboardPage/`

**路由**: `/dashboard`

**功能**:
- **頂部欄 (TopBar)**:
  - Logo + 品牌名稱
  - 通知圖標
  - 用戶頭像

- **側邊欄 (Sidebar)**:
  - Dashboard（當前頁）
  - Sites
  - Reports
  - Alerts
  - Settings

- **主要內容區**:
  - 頁面標題 + "Add Site" 按鈕
  - 3 個指標卡片（LCP、INP、CLS）
  - 頁面性能表格

**響應式**:
- 桌面版：側邊欄固定在左側
- 平板版：側邊欄寬度縮小
- 移動版：側邊欄變為水平滾動導航

## 🚀 使用說明

### 1. 啟動開發服務器
```bash
npm run dev
```

### 2. 構建生產版本
```bash
npm run build
```

### 3. 類型檢查
```bash
npm run type-check
```

## 🎯 路由配置

```typescript
// src/App.tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/" element={<Navigate to="/login" replace />} />
</Routes>
```

## 📦 導入組件

```typescript
// 導入所有組件
import {
  Button,
  Input,
  Badge,
  MetricCard,
  DataTable,
} from './components';

// 或單獨導入
import { Button } from './components/Button';
import { MetricCard } from './components/MetricCard';
```

## 🎨 設計規範對應

所有組件都嚴格遵循 `樣式規格.md` 中定義的設計系統：

- ✅ 色彩系統（主色 #3b82f6）
- ✅ 字體系統（Inter + Roboto Mono）
- ✅ 間距系統（基於 4px）
- ✅ 組件樣式（按鈕、卡片、表單、徽章）
- ✅ 響應式設計（sm/md/lg/xl 斷點）
- ✅ 動畫效果（transition、hover 狀態）

## 📝 注意事項

1. **圖標**: 目前使用 emoji 作為臨時圖標，建議後續整合 `lucide-react` 或其他圖標庫
2. **認證**: LoginPage 目前是簡化版，沒有真實的認證邏輯
3. **數據**: Dashboard 使用模擬數據，需要連接真實 API
4. **TypeScript**: 所有組件都有完整的 TypeScript 類型定義
5. **SCSS**: 使用 SCSS 模塊化，每個組件都有自己的樣式文件

## 🔧 技術棧

- **React**: 19.2.4
- **TypeScript**: 5.9.3
- **React Router**: 7.13.0
- **SCSS**: 1.97.3
- **Webpack**: 5.105.0
