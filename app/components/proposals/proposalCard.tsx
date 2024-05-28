import React, { useState } from "react";
import styles from "./proposals.module.css";

interface ProposalCard {
  creatorname: string;
  datecreated: string;
  dateedited: string;
  deadline: string;
  description: string;
  disputereason: string | null;
  email: string;
  firstname: string;
  hasvoted: boolean;
  hoursadjustment: number | null;
  isclosed: boolean;
  lastname: string;
  maxhours: number;
  period: string | null;
  proposaluid: string;
  rate: number;
  rateadjustment: number | null;
  removalcollaboratorname: string | null;
  removalreason: string | null;
  type: string;
  votesagainst: number;
  votesfor: number;
  votesremaining: number;
  votesrequired: number;
}

interface ProposalCardProps {
  proposal: ProposalCard;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const {
    proposaluid,
    creatorname,
    datecreated,
    deadline,
    description,
    disputereason,
    email,
    firstname,
    hasvoted,
    hoursadjustment,
    isclosed,
    lastname,
    maxhours,
    period,
    rate,
    rateadjustment,
    removalcollaboratorname,
    removalreason,
    type,
    votesagainst,
    votesfor,
    votesremaining,
    votesrequired,
  } = proposal;
  const [toggleExpanded, setToggleExpanded] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(hasvoted);
  const [isClosed, setIsClosed] = useState(isclosed);
  const [votesAgainst, setVotesAgainst] = useState(votesagainst);
  const [votesFor, setVotesFor] = useState(votesfor);
  const [votesRemaining, setVotesRemaining] = useState(votesremaining);
  const [votesRequired, setVotesRequired] = useState(votesrequired);

  // Format timestamps as human-readable dates
  const formattedDateCreated = new Date(datecreated).toLocaleString();
  const formattedDeadline = new Date(deadline).toLocaleString();

  const handleToggleExpanded = () => {
    setToggleExpanded(!toggleExpanded);
  };

  const handleVote = async (vote: string) => {
    setButtonClicked(true);
    const userUid = "0b8167c0-9277-4f51-b913-eb810aaa7ffc";

    const url = "https://teamtokens.dev/api/v1/votes";
    const payload = {
      proposalUid: proposaluid,
      vote: vote,
      userUid: userUid,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, data);
      if (response.ok) {
        const responseBody = await response.json();
        console.log("vote: ", responseBody);
        setHasVoted(responseBody.hasvoted);
        setIsClosed(responseBody.isclosed);
        setVotesAgainst(responseBody.votesagainst);
        setVotesFor(responseBody.votesfor);
        setVotesRemaining(responseBody.votesremaining);
        setVotesRequired(responseBody.votesrequired);
      } else {
        const errorResponse = await response.json();
        console.error("Error: ", errorResponse);
        setError("Failed to save vote");
      }
    } catch (error) {
      console.error("Error: ", error);
      setError("Failed to save vote");
    } finally {
      setLoading(false);
    }
  };

  // more button
  const moreDetails = () => (
    <button className={styles.expandButton} onClick={handleToggleExpanded}>
      More details...
    </button>
  );

  //closed tag
  const closed = () => <div className={styles.closedButton}>Closed</div>;

  const actionButtons = () => (
    <div className={styles.actionButtonContainer}>
      <button
        onClick={() => {
          handleVote("for");
        }}
        className={styles.actionButtons}
        disabled={buttonClicked}
      >
        For
      </button>

      <button
        onClick={() => {
          handleVote("against");
        }}
        className={styles.actionButtons}
        disabled={buttonClicked}
      >
        Against
      </button>
    </div>
  );

  let content;

  const AddCollaborator = () => {
    return (
      <>
        <div className={styles.proposalMainContainer}>
          <div>
            [Add Collaborator] @{creatorname} would like to add {firstname}{" "}
            {lastname} as a collaborator
          </div>
          {isClosed == true ? closed() : null}
        </div>

        <div className={styles.subDescription}>
          @ ${rate / 100}/hr for {maxhours / 100} hr/week
        </div>
      </>
    );
  };

  const RemoveCollaborator = () => {
    return (
      <>
        <div className={styles.proposalMainContainer}>
          <div>
            [Remove Collaborator] @{creatorname} would like to remove{" "}
            {removalcollaboratorname} as a collaborator
          </div>
          {isClosed == true ? closed() : null}
        </div>
      </>
    );
  };

  const DisputeEntry = () => {
    return (
      <>
        <div className={styles.proposalMainContainer}>
          <div>
            [Dispute Entry] @{creatorname} would like to dispute an entry by{" "}
            {removalcollaboratorname} for period {period}.
          </div>
          {isClosed == true ? closed() : null}
        </div>

        <div>
          <div>The new inputs would be:</div>
          <div>Time - {hoursadjustment} hours</div>
          <div>Money - ${rateadjustment}</div>
        </div>
      </>
    );
  };

  const Extended = () => {
    return (
      <>
        <div>{description}</div>
        <div>
          <div className={styles.votingContainer}>
            <div className={styles.votingTitle}>Voting Record</div>
            <div>
              <div>
                Votes for: <span className={styles.count}>{votesFor}</span>
              </div>
              <div>
                Votes against:{" "}
                <span className={styles.count}>{votesAgainst}</span>
              </div>
              <div>
                Votes required for approval:{" "}
                <span className={styles.count}>{votesRequired}</span>
              </div>
              <div>
                Votes remaining:{" "}
                <span className={styles.count}>{votesRemaining}</span>
              </div>
            </div>
          </div>

          {isClosed ? (
            <div>Voting is closed.</div>
          ) : hasVoted ? (
            <div>You have already voted.</div>
          ) : (
            <div>{actionButtons()}</div>
          )}

          <button
            className={styles.expandButton}
            onClick={handleToggleExpanded}
          >
            Collapse ^
          </button>
        </div>
      </>
    );
  };

  switch (type) {
    case "Add Collaborator":
      content = <AddCollaborator />;
      break;
    case "Remove Collaborator":
      content = <RemoveCollaborator />;
      break;
    case "Dispute Entry":
      content = <DisputeEntry />;
      break;
    default:
      content = <p>Other</p>;
  }

  return (
    <div className={styles.proposalCard}>
      {content}
      {toggleExpanded == false ? moreDetails() : null}
      {toggleExpanded == true ? Extended() : null}
    </div>
  );
};

export default ProposalCard;
