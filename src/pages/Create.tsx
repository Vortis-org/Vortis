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
import { CalendarIcon } from "lucide-react";

export default function Create() {
  const [formData, setFormData] = useState({
    description: "",
    predictionX: "",
    predictionY: "",
    endTime: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endTimeBigInt = BigInt(formData.endTime.getTime());
    console.log({ ...formData, endTime: endTimeBigInt });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <div className="border-black border-4 rounded-2xl p-6">
          <h1 className="font-brice-semibold text-2xl mb-6">
            Create Prediction
          </h1>

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
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">End Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "w-full p-3 border-2 border-black rounded-xl flex items-center justify-start text-left font-normal",
                      !formData.endTime && "text-muted-foreground"
                    )}
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-4 w-full bg-[#99ff88] text-black py-4 px-6 rounded-xl border-black border-2 font-semibold text-lg"
            >
              Create Prediction
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
