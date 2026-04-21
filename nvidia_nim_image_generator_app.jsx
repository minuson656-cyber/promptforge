import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await fetch("https://integrate.api.nvidia.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `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`,
        },
        body: JSON.stringify({
          prompt,
          model: "nvidia/sdxl",
          size: "1024x1024",
        }),
      });

      const data = await res.json();
      const imageUrl = data.data[0].url;

      setImages((prev) => [
        { prompt, url: imageUrl },
        ...prev,
      ]);

      setPrompt("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NVIDIA NIM Image Generator</h1>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={generateImage} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <div className="space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl shadow">
              <CardContent className="p-4">
                <p className="mb-2 text-sm text-gray-600">{img.prompt}</p>
                <img
                  src={img.url}
                  alt={img.prompt}
                  className="rounded-xl w-full"
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
