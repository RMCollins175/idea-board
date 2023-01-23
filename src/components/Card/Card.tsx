import { useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";
import { useForm } from "react-hook-form";
import { IdeaType } from "../../utilities/types";

export interface CardProps {
  idea?: IdeaType;
  // key?: React.Key;
}

export const Card = (props: CardProps) => {
  const { idea } = props;
  const { addIdea, updateIdea, deleteIdea } = useContext(IdeaContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: idea ? idea.title : "",
      description: idea ? idea.description : ""
    }
  });

  const handleSubmission = (data: any) => {
    if (idea?.id) {
      updateIdea(idea?.id, data.title, data.description);
    } else {
      addIdea(data.title, data.description);
      reset();
    }
  };

  const handleDelete = () => {
    if (idea?.id) {
      deleteIdea(idea.id);
    }
  };

  const isAnIdea = !!idea?.id;

  return (
    <div className={styles.ideaContainer}>
      <form
        onSubmit={handleSubmit((data) => handleSubmission(data))}
        className={styles.ideaForm}
      >
        <label className={styles.ideaTitleLabel}>
          <input
            {...register("title")}
            placeholder="Title"
            required
            className={styles.ideaTitleInput}
            defaultValue={idea?.title}
          />
        </label>
        <label className={styles.ideaDescriptionLabel}>
          <textarea
            {...register("description")}
            placeholder="Description"
            maxLength={140}
            className={styles.ideaDescriptionInput}
            defaultValue={idea?.description}
          />
        </label>
        {isAnIdea && (
          <p className={styles.ideaTimestamp}>
            {`${
              idea?.timestamp &&
              format(new Date(idea?.timestamp), "yyyy-MM-dd - HH:mm:ss")
            }`}
          </p>
        )}
        <div className={styles.callToActionContainer}>
          <button type="submit">{idea?.id ? `Update` : `Add`}</button>

          <button type="button" onClick={() => reset()}>
            Reset
          </button>
          {isAnIdea && <button onClick={handleDelete}>Delete</button>}
        </div>
      </form>
    </div>
  );
};
