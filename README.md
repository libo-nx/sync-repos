# sync-repos

一个用于同步指定目录下所有 Git 仓库的工具。默认情况下，它会拉取所有分支，并且在拉取之前会检查是否有远程仓库。

## 安装

### 全局安装

1. **克隆项目**：

    ```sh
    git clone https://github.com/yourusername/sync-repos.git
    cd sync-repos
    ```

2. **全局安装**：

    ```sh
    npm link
    ```

### 从 npm 安装（可选）

- 如果你已经将项目发布到 npm，可以使用以下命令全局安装：

    ```sh
    npm install -g sync-repos
    ```

## 使用

### 基本用法

1. **拉取所有分支**：

    ```sh
    sync-repos /path/to/your/repositories
    ```

2. **拉取指定分支**：

    ```sh
    sync-repos /path/to/your/repositories main
    ```

### 参数

- `<directory>`: 必填，指定要同步的目录路径。
- `[branch]`: 可选，指定要拉取的分支名称。如果不指定，默认拉取所有分支。

### 示例

1. **拉取所有分支**：

    ```sh
    sync-repos /Users/username/Projects
    ```

2. **拉取指定分支（例如 `main`）**：

    ```sh
    sync-repos /Users/username/Projects main
    ```

## 功能

- **递归遍历目录**：工具会递归遍历指定目录及其子目录，查找所有的 Git 仓库。
- **检查远程仓库**：在拉取之前，工具会检查每个 Git 仓库是否有远程仓库。如果没有远程仓库，会输出警告信息。
- **拉取所有分支**：默认情况下，工具会拉取所有分支。如果指定了分支名称，则只拉取指定的分支。

## 错误处理

- **目录不存在**：如果指定的目录不存在，工具会输出错误信息并退出。
- **远程仓库不存在**：如果某个 Git 仓库没有远程仓库，工具会输出警告信息并跳过该仓库。
- **拉取失败**：如果拉取过程中出现错误，工具会输出错误信息并继续处理下一个仓库。

## 贡献

欢迎贡献！如果你有任何改进建议或发现 bug，请提交 issue 或 pull request。

## 许可

本项目采用 MIT 许可证，详情参见 [LICENSE](./LICENSE) 文件。

## 联系

如果有任何问题或建议，请联系 [libo_nx@qq.com](libo_nx@qq.com)。

------

感谢使用 `sync-repos`！