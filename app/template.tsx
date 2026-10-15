import { MotionMain } from "@/components/motion/motion-main";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MotionMain>{children}</MotionMain>;
}
