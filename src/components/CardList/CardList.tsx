import { useContext } from "react";
import { IdeaContext } from "../../context/IdeaContext";
import { IdeaType } from "../../utilities/types";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css";

export const CardList = () => {
  const { ideas } = useContext(IdeaContext);

  return (
    <div className={styles.CardListcontainer}>
      {ideas.map((idea: IdeaType) => (
        <div className={styles.ideaContainer} key={idea.id}>
          <Card idea={idea} />
        </div>
      ))}
    </div>
  );
};
