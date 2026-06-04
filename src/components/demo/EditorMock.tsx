import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSceneTimer } from "../../hooks/useSceneTimer";
import { Window } from "../ui/Window";

export function Editor({
  sceneKey,
  files,
  accent = "cyan",
}: {
  sceneKey: string;
  files: string[];
  accent?: "cyan" | "emerald" | "rose";
}) {
  const elapsed = useSceneTimer(`${sceneKey}:editor`);
  const bg =
    accent === "emerald"
      ? "bg-emerald-400/[0.14]"
      : accent === "rose"
      ? "bg-rose-400/[0.14]"
      : "bg-cyan-400/[0.14]";

  const snippets = useMemo(() => {
    if (files.includes("tests/checkout.spec.ts")) {
      return [
        "describe('checkout', () => {",
        "  it('returns 200 for a valid cart', async () => {",
        "    const response = await request(app)",
        "      .post('/checkout')",
        "      .send({ cartId: 'cart_123', paymentMethod: 'card' })",
        "      .expect(200);",
        "    expect(response.body.status).toBe('ok');",
        "    expect(response.body.orderId).toMatch(/^ord_/);",
        "  });",
        "});",
      ];
    }

    if (files.includes("src/types/result.ts")) {
      return [
        "export type CheckoutResult = {",
        "  status: 'ok' | 'failed';",
        "  orderId?: string;",
        "  errorCode?: string;",
        "};",
        "",
        "export function mapCheckoutResult(response: ApiResponse): CheckoutResult {",
        "  if (!response.ok) return { status: 'failed', errorCode: response.code };",
        "  return { status: 'ok', orderId: response.data.orderId };",
        "}",
      ];
    }

    if (files.includes("src/api/checkout.ts")) {
      return [
        "export async function checkout(orderId: string, payload: CheckoutPayload) {",
        "  const response = await paymentClient.createOrder({ orderId, ...payload });",
        "  if (!response.ok) {",
        "    throw new CheckoutError(response.code ?? 'CHECKOUT_FAILED');",
        "  }",
        "  return mapCheckoutResult(response);",
        "}",
        "",
        "router.post('/checkout', async (req, res) => {",
        "  const result = await checkout(req.body.cartId, req.body);",
        "  return res.status(200).json(result);",
        "});",
      ];
    }

    return [
      "export async function createCheckout(cartId: string, payload: CheckoutPayload) {",
      "  const cart = await cartRepository.getById(cartId);",
      "  if (!cart) throw new Error('Cart not found');",
      "",
      "  const response = await paymentClient.authorize({",
      "    cartId,",
      "    amount: cart.total,",
      "    paymentMethod: payload.paymentMethod,",
      "  });",
      "",
      "  return mapCheckoutResult(response);",
      "}",
    ];
  }, [files]);

  return (
    <Window title="editor">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/30">files</div>
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: elapsed > i * 180 + 120 ? 1 : 0.28, y: elapsed > i * 180 + 120 ? 0 : -6 }}
              className={`rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/78 ${bg}`}
            >
              {file}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="px-5 py-5 font-mono text-[14px] leading-7 text-white/78 md:text-[15px]">
        {snippets.map((line, i) => (
          <motion.div
            key={`${sceneKey}-line-${i}`}
            initial={{ opacity: 0.18, y: 4 }}
            animate={{ opacity: elapsed > i * 85 ? 1 : 0.18, y: elapsed > i * 85 ? 0 : 4 }}
            className="grid grid-cols-[28px_1fr] gap-4 rounded-xl px-3 py-1 hover:bg-white/3"
          >
            <span className="pt-0.5 text-right text-white/22">{i + 1}</span>
            <span className="whitespace-pre-wrap wrap-break-word">{line}</span>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}
