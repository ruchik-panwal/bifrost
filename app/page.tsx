import AniGif from "@/components/aniGif/AniGif"
import Calendar from "@/components/calendar/Calendar"
import Clock from "@/components/clock/Clock"
import ComputerStats from "@/components/computerStats/ComputerStats"
import Github from "@/components/github/Github"
import HabitTracker from "@/components/habitTracker/HabitTracker"
import Search from "@/components/search/Search"
import Todolist from "@/components/todolist/Todolist"

export default function Home() {
  return (
    <div>
      <div className="flex flex-col">
        <Clock />
        <Search />
      </div>
      <div className="flex flex-col"></div>
      <div className="flex flex-col"></div>
    </div>
  );
}
