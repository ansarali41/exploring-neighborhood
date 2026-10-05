import {
  AudioLines,
  Binoculars,
  Bird,
  BookOpen,
  CalendarDays,
  Camera,
  CirclePlay,
  Eye,
  FileText,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Link2,
  Microscope,
  NotebookPen,
  ScanSearch,
  Smartphone,
  Sprout,
  Telescope,
  Users,
  BellRing,
  Share2,
  type LucideProps,
} from "lucide-react";
import { FrogIcon } from "./icons";

const map = {
  audio: AudioLines,
  binoculars: Binoculars,
  bird: Bird,
  "bird-walks": Bird,
  book: BookOpen,
  calendar: CalendarDays,
  camera: Camera,
  video: CirclePlay,
  eye: Eye,
  file: FileText,
  flask: FlaskConical,
  frog: FrogIcon,
  "frog-walks": FrogIcon,
  graduation: GraduationCap,
  education: Microscope,
  heart: HeartHandshake,
  leaf: Leaf,
  link: Link2,
  notebook: NotebookPen,
  search: ScanSearch,
  "citizen-science": Smartphone,
  sprout: Sprout,
  "sky-watch": Telescope,
  telescope: Telescope,
  users: Users,
  bell: BellRing,
  share: Share2,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = map[name];
  return <Component aria-hidden="true" {...props} />;
}

/** Rounded tinted square holding an icon — used on cards across the site */
export function IconBadge({ name, tone = "forest", className = "" }: { name: IconName; tone?: "forest" | "gold" | "sky" | "light"; className?: string }) {
  const tones = {
    forest: "bg-leaf-100 text-forest-600",
    gold: "bg-gold-300/30 text-earth-700",
    sky: "bg-sky-100 text-sky-600",
    light: "bg-white/10 text-gold-300",
  };
  return (
    <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]} ${className}`}>
      <Icon name={name} size={24} strokeWidth={1.75} />
    </span>
  );
}
