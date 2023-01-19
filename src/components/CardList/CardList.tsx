import { useContext } from "react";
import { IdeaContext } from "../../context/IdeaContext";
import { Card } from "../Card/Card";
import styles from "./CardList.module.css";

export const CardList = () => {
  const { ideas } = useContext(IdeaContext);
  console.log("🚀 ~ file: CardList.tsx:9 ~ CardList ~ ideas", ideas);

  return (
    <div className={styles.CardListcontainer}>
      {ideas.map((idea: any) => (
        <div className={styles.ideaContainer} key={idea.id}>
          <Card
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
