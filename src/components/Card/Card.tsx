import { useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";
import { useForm } from "react-hook-form";
import { IdeaType } from "../../utilities/types";

export interface CardProps {
  idea?: IdeaType;
}

export const Card = (props: CardProps) => {
  const { idea } = props;
  const { dispatch } = useContext(IdeaContext);

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
      dispatch({
        type: "UPDATE_IDEA",
        payload: {
          id: idea.id,
          title: data.title,
          description: data.description
        }
      });
    } else {
      dispatch({
        type: "ADD_IDEA",
        payload: {
          title: data.title,
          description: data.description
        }
      });
      reset();
    }
  };

  const handleDelete = () => {
    if (idea?.id) {
      dispatch({
        type: "DELETE_IDEA",
        payload: {
          id: idea.id
        }
      });
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
            id={`title-${idea?.id}`}
            {...register("title")}
            placeholder="Title"
            required
            className={styles.ideaTitleInput}
            defaultValue={idea?.title}
            aria-label={idea?.title}
          />
        </label>
        <label className={styles.ideaDescriptionLabel}>
          <textarea
            id={`description-${idea?.id}`}
            {...register("description")}
            placeholder="Description"
            maxLength={140}
            className={styles.ideaDescriptionInput}
            defaultValue={idea?.description}
            aria-label={idea?.description}
          />
        </label>
        {isAnIdea && (
          <p className={styles.ideaTimestamp} aria-label={"Timestamp"}>
            {`${
              idea?.timestamp &&
              format(new Date(idea?.timestamp), "yyyy-MM-dd - HH:mm:ss")
            }`}
          </p>
        )}
        <div className={styles.callToActionContainer}>
          <button
            type="submit"
            aria-label={idea?.id ? `Update Button` : `Add Button`}
          >
            {idea?.id ? `Update` : `Add`}
          </button>

          <button type="button" onClick={() => reset()}>
            Reset
          </button>
          {isAnIdea && (
            <button onClick={handleDelete} aria-label={"Delete Button"}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
