// // 文件路径: quartz/components/proof.tsx

// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// // 这是将在浏览器中执行的客户端脚本
// const clientScript = `
// (() => {
//   const handleProofReplacement = () => {
//     const content = document.querySelector("article.popover-hint");
//     if (content && !content.classList.contains("proof-processed")) {
//       content.classList.add("proof-processed");
      
//       let html = content.innerHTML;
//       html = html.replace(/\\begin\{proof\}/g, '<p><strong><em>Proof.</em></strong>')
//                  .replace(/\\end\{proof\}/g, '</p><p><span class="qed-symbol">□</span></p>');
      
//       content.innerHTML = html;
//     }

//   document.addEventListener("nav", handleProofReplacement);
//   handleProofReplacement();
// })();
// `



// // 这是 Quartz 组件, 它现在正确地接受了 props 参数
// // 我们用 _props 来表示“接收了但未使用”
// function ProofScript(_props: QuartzComponentProps) {
//   return (
//     <script dangerouslySetInnerHTML={{ __html: clientScript }}></script>
//   )
// }

// // 使用 satisfy 操作符来确保类型正确，这是更现代和安全的方式
// export default (() => ProofScript) satisfies QuartzComponentConstructor



import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// 这是将在浏览器中执行的客户端脚本
// 它已被重写以稳健地处理 proof 环境
const clientScript = `
(() => {
  const handleProofReplacement = () => {
    // 1. 选择包含笔记内容的核心区域
    const content = document.querySelector("article.popover-hint");

    // 2. 检查内容是否存在且尚未被处理
    if (content && !content.classList.contains("proof-processed")) {
      content.classList.add("proof-processed");
      
      let html = content.innerHTML;

      // 3. 定义一个强大的正则表达式
      //    - 它会查找被 <code> 标签包裹的 \\begin{proof} 和 \\end{proof}
      //    - 它能灵活处理标签周围可能存在的 <p> 标签和空白
      //    - ( [\\s\\S]*? ) 会捕获两者之间的所有内容（包括换行和HTML标签）
      const proofRegex = /(?:<p>)?\\s*<code>\\\\begin\\{proof\\}<\\/code>\\s*(?:<\\/p>)?([\\s\\S]*?)(?:<p>)?\\s*<code>\\\\end\\{proof\\}<\\/code>\\s*(?:<\\/p>)?/g;

      // 4. 定义一个结构清晰的 HTML 模板用于替换
      //    - $1 会被自动替换为正则表达式捕获到的证明正文
      const replacementTemplate = \`
        <div class="proof-environment">
          <p class="proof-start"><strong><em>Proof.</em></strong></p>
          <div class="proof-body">$1</div>
          <div class="proof-qed">□</div>
        </div>
      \`;

      // 5. 执行替换
      html = html.replace(proofRegex, replacementTemplate);
      
      // 6. (可选但推荐) 清理因替换而产生的空 <p> 标签
      html = html.replace(/<p>\\s*<\\/p>/g, '');

      // 7. 将修改后的 HTML 写回页面
      content.innerHTML = html;
    }
  };

  // 8. 在页面首次加载和每次导航后都运行此脚本
  document.addEventListener("nav", handleProofReplacement);
  handleProofReplacement();
})();
`

// 这是 Quartz 组件, 它将上述脚本注入到页面中
function ProofScript(_props: QuartzComponentProps) {
  return (
    <script dangerouslySetInnerHTML={{ __html: clientScript }}></script>
  )
}

// 导出组件
export default (() => ProofScript) satisfies QuartzComponentConstructor