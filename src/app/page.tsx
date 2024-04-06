"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { GenerationForm } from "./generation-form";
import { ValidationForm } from "./validation-form";

export default function HomePage() {
  let [generatedJwt, setGeneratedJwt] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#6ed8d8] to-[#00ffaa]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Tabs defaultValue="generation" className="w-full max-w-prose drop-shadow-2xl">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="generation">
              Generation
            </TabsTrigger>
            <TabsTrigger className="w-full" value="validation">
              Validation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generation">
            <div className="flex flex-col gap-8 rounded-lg bg-white p-8 drop-shadow-2xl">
              <GenerationForm setGeneratedJwt={setGeneratedJwt} />
              <div>
                <Label>Result</Label>
                <Textarea
                  readOnly
                  value={generatedJwt}
                ></Textarea>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="validation">
            <div className="flex flex-col gap-8 rounded-lg bg-white p-8 drop-shadow-2xl">
              <ValidationForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
