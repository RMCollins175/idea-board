import React, { useContext } from "react";
import { IdeaContext } from "../../context/IdeaContext";
import { IdeaType } from "../../utilities/types";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css";

export const CardList = () => {
  const { ideas } = useContext(IdeaContext);

  return (
    <div className={styles.cardlistContainer}>
      {ideas.map((idea: IdeaType) => (
        <React.Fragment key={idea.id}>
          <Card idea={idea} />
        </React.Fragment>
      ))}
    </div>
  );
};
