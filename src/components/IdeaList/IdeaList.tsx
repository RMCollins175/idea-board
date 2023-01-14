import React, { useContext } from "react";
import {
  IdeaContext,
  IdeaContextType
} from "../../utilities/context/IdeaContext";
import { Idea } from "../Idea/Idea";
import styles from "./IdeaList.module.css";

export const IdeaList = () => {
  const { ideas } = useContext(IdeaContext) as IdeaContextType;

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
