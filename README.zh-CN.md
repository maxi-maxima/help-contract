<div align="center">

# Help Contract

**检查 CLI help text 是否具备 agent-ready 的命令契约。**

[English](README.md)

</div>

Agent 使用 CLI 的方式经常和人一样：先跑 `--help`。如果 help text 缺少示例、退出码或选项语义，agent 就会猜。

`help-contract` 把 CLI help 当成一种契约。它会运行 help 命令，检查输出是否包含 agent 需要的关键部分，并写出 JSON/Markdown 报告。

不需要 API key。不调用模型。不扫描源码。

## 30 秒演示

```bash
npx github:maxi-maxima/help-contract demo
```

演示会写出：

```text
reports/demo/help-contract.json
reports/demo/help-contract.md
```

## 检查一个 CLI

```bash
npx github:maxi-maxima/help-contract audit -- my-cli --help
```

自定义输出目录：

```bash
npx github:maxi-maxima/help-contract audit --out reports/help -- my-cli scan --help
```

## 检查什么

| 部分 | 为什么 agent 需要 |
| --- | --- |
| Usage | 命令形状和必填位置参数。 |
| Commands | 可用子命令及名称。 |
| Options | flags、取值和开关。 |
| Examples | 具体调用方式，减少猜测。 |
| Exit codes | 自动化如何理解成功与失败。 |

彩色 section 标题也能被识别，捕获的原始输出不会被改写。

## 评分

缺少 `usage` 或 `options` 是 error 级问题。缺少 `commands`、`examples` 或 `exit codes` 是 warning 级问题。

评分规则刻意保持简单、可解释。

## 它不是什么

`help-contract` 不推断隐藏行为，不解析源码，也不证明 CLI 真的可用。它只检查公开 help surface。

## 开发

```bash
npm install
npm run check
node dist/cli.js demo --out reports/demo
npm pack --dry-run --ignore-scripts
```

## 许可证

MIT
