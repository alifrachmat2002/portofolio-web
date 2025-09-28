import { Techstack } from "@/db/schema/techstacks"

interface PropsType {
    techstack: Techstack
}
const TechstackBadge = ({ techstack } : PropsType) => {
    return (
        <span
            key={techstack.id}
            className="bg-primary/10 text-primary dark:bg-primary/20 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-primary hover:text-white dark:hover:bg-primary hover:-translate-y-1"
        >
            {techstack.name}
        </span>
    );
}

export default TechstackBadge;