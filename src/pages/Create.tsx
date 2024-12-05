import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
// import { buildCreateMarketTransaction } from "@/lib/contractUtils";
import { CHAIN, useTonConnectUI } from "@tonconnect/ui-react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useToast } from "@/hooks/use-toast";
import { toNano } from "@ton/ton";
import { beginCell } from "@ton/core"; // Import TON Cell functions
import { useTonAddress } from "@tonconnect/ui-react";

export const CONTRACT_ADDRESS =
  "EQBb_tnQy8fQbmqVjq2dG6TmsCE_91wTmZ9EUlcCipeR8zIe";

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { toast } = useToast();
  const userAddress = useTonAddress();

  const [formData, setFormData] = useState({
    description: "",
    predictionX: "",
    predictionY: "",
    endTime: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tonConnectUI.connected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const payloadCell = beginCell()
        .storeUint(0x1234, 32)
        .storeInt(Date.now(), 257)
        .storeRef(
          beginCell().storeBuffer(Buffer.from(formData.description)).endCell()
        )
        .storeRef(
          beginCell().storeBuffer(Buffer.from(formData.predictionX)).endCell()
        )
        .storeRef(
          beginCell().storeBuffer(Buffer.from(formData.predictionY)).endCell()
        )
        .storeInt(BigInt(Math.floor(formData.endTime.getTime() / 1000)), 257)
        .endCell();

      const payloadBoc = payloadCell.toBoc().toString("base64");

      const result = await tonConnectUI.sendTransaction({
        from: userAddress,
        validUntil: Date.now() + 10000000000,
        network: CHAIN.TESTNET,
        messages: [
          {
            address: CONTRACT_ADDRESS.toString(),
            amount: toNano("0.05").toString(),
            payload: payloadBoc,
          },
        ],
      });

      console.log("Transaction result:", result);

      toast({
        title: "Success",
        description: "Market created successfully!",
      });

      setFormData({
        description: "",
        predictionX: "",
        predictionY: "",
        endTime: new Date(),
      });
    } catch (error) {
      console.error("Error creating market:", error);
      toast({
        title: "Error",
        description: "Failed to create market. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="border-black border-4 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-brice-semibold text-2xl">Create Prediction</h1>
            <TonConnectButton />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-medium">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 border-2 border-black rounded-xl"
                placeholder="Will it rain tomorrow?"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Option 1</label>
                <input
                  type="text"
                  value={formData.predictionX}
                  onChange={(e) =>
                    setFormData({ ...formData, predictionX: e.target.value })
                  }
                  className="w-full p-3 border-2 border-black rounded-xl"
                  placeholder="Yes"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Option 2</label>
                <input
                  type="text"
                  value={formData.predictionY}
                  onChange={(e) =>
                    setFormData({ ...formData, predictionY: e.target.value })
                  }
                  className="w-full p-3 border-2 border-black rounded-xl"
                  placeholder="No"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">End Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full p-3 border-2 border-black rounded-xl flex items-center justify-start text-left font-normal",
                      !formData.endTime && "text-muted-foreground"
                    )}
                    disabled={loading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endTime ? (
                      format(formData.endTime, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endTime}
                    onSelect={(date) =>
                      date && setFormData({ ...formData, endTime: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* <div>
              <label className="block mb-2 font-medium">
                Image URL (Optional)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full p-3 border-2 border-black rounded-xl"
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
            </div> */}

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              className="mt-4 w-full bg-[#99ff88] text-black py-4 px-6 rounded-xl border-black border-2 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !tonConnectUI.connected}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Prediction"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
