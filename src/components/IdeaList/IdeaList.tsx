import React, { useContext } from "react";
import { IdeaContext, IdeaContextType } from "../../context/IdeaContext";
import { IdeaType } from "../../types/types";
import { Idea } from "../Idea/Idea";
import styles from "./IdeaList.module.css";

export const IdeaList = () => {
  const { ideas } = useContext(IdeaContext) as IdeaContextType;

  return (
    <div className={styles.ideaListcontainer}>
      {ideas.map((idea: IdeaType) => (
        <div className={styles.ideaContainer} key={idea.id}>
          <Idea idea={idea} />
        </div>
      ))}
    </div>
  );
};
