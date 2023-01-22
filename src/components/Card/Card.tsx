import { useContext } from "react";
import styles from "./Card.module.css";
import { format } from "date-fns";
import { IdeaContext } from "../../context/IdeaContext";
import { useForm } from "react-hook-form";

export interface CardProps {
  ideaTitle?: string;
  ideaDescription?: string;
  id?: string;
  timestamp?: number;
}

export const Card = ({
  ideaTitle,
  ideaDescription,
  id,
  timestamp
}: CardProps) => {
  const { addIdea, updateIdea, deleteIdea } = useContext(IdeaContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: ideaTitle || "",
      description: ideaDescription || ""
    }
  });

  const handleSubmission = (data: any) => {
    if (id) {
      updateIdea(id, data.title, data.description);
    } else {
      addIdea(data.title, data.description);
      reset();
    }
  };

  const isAnIdea = !!id;

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
            defaultValue={ideaTitle}
          />
        </label>
        <label className={styles.ideaDescriptionLabel}>
          <textarea
            {...register("description")}
            placeholder="Description"
            maxLength={140}
            className={styles.ideaDescriptionInput}
            defaultValue={ideaDescription}
          />
        </label>
        {isAnIdea && (
          <p className={styles.ideaTimestamp}>
            {`${
              timestamp && format(new Date(timestamp), "yyyy-MM-dd - HH:mm:ss")
            }`}
          </p>
        )}
        <div className={styles.callToActionContainer}>
          <button type="submit">{id ? `Update` : `Add`}</button>

          <button type="button" onClick={() => reset()}>
            Reset
          </button>
          {isAnIdea && <button onClick={() => deleteIdea(id)}>Delete</button>}
        </div>
      </form>
    </div>
  );
};
