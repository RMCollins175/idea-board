import { useContext } from "react";
import { IdeaContext } from "../../context/IdeaContext";
import { Idea } from "../Idea/Idea";
import styles from "./IdeaList.module.css";

export const IdeaList = () => {
  const { ideas } = useContext(IdeaContext);

  return (
    <div className={styles.ideaListcontainer}>
      {ideas.map((idea: any) => (
        <div className={styles.ideaContainer} key={idea.id}>
          <Idea
            ideaTitle={idea.title}
            ideaDescription={idea.description}
            id={idea.id}
            timestamp={idea.timestamp}
          />
        </div>
      ))}
    </div>
  );
};
