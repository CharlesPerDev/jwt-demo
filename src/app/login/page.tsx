import { Button } from "@/components/ui/button";

const loginPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-[#6ed8d8] to-[#00ffaa] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Button variant={"ghost"}>Click to die</Button>
      </div>
    </main>
  );
};

export default loginPage;
