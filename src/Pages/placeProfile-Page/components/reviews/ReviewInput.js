import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useContext, useRef, useState, useEffect } from "react";

import { db } from "../../../../firebase-config";
import { useUser } from "../../../../Context/UserContext";

import CityDataContext from "../../../../Context/CityDataContext";

export default function ReviewInput() {
  //stored place data from local storage
  const storageData = JSON.parse(localStorage.getItem("storedCardData"));
  const storageUser = JSON.parse(localStorage.getItem("storedUser"));

  const style = {
    width: "100%",
    border: "1px solid var(--main_color)",
    borderRadius: "5px",
    resize: "none",
    padding: "10px",
  };

  const [reviewsData, setReviewsData] = useState([]);
  const reviewRef = useRef();

  async function submitComment(e) {
    e.preventDefault();
    const usersPath = `Users/${storageUser.id}/Places Reviews/${storageData.id}`;
    const userRef = doc(db, usersPath);

    const placePPath = `Places/${storageData.id}/Reviews/${storageUser.id}`;
    const PlaceRef = doc(db, placePPath);

    if (reviewRef.current.value === "") return;

    try {
      let rev;

      rev = { review: reviewRef.current.value, createdAt: new Date() };

      // if (reviewsData) {
      //   if (reviewsData.review) {
      //     rev = [
      //       ...reviewsData.review,
      //       { review: reviewRef.current.value, createdAt: new Date() },
      //     ];
      //   } else {
      //   }
      // } else {
      //   rev = [{ review: reviewRef.current.value, createdAt: new Date() }];
      // }

      await setDoc(
        PlaceRef,
        {
          reference: `Users/${storageUser.id}`,
          review: rev,
          updated: serverTimestamp(),
        },
        { merge: true }
      )
        .then(() => {
          console.log("added to place ref");
        })
        .catch((e) => {
          console.log(e);
        });

      await setDoc(
        userRef,
        {
          reference: `Places/${storageData.id}`,
          describtion: rev,
        },
        { merge: true }
      )
        .then(() => {
          console.log("added to user ref");
        })
        .catch((e) => {
          console.log(e);
        });

      reviewRef.current.value = "";
    } catch {
      console.log("ERRRRRRRROR");
    }
  }

  useEffect(() => {
    const placePPath = `Places/${storageData.id}/Reviews/${storageUser.id}`;
    const PlaceRef = doc(db, placePPath);

    const unsubscribe = onSnapshot(PlaceRef, (snapshot) => {
      // console.log("placePPath in onSnapshot");
      // console.log(placePPath);
      setReviewsData("snapshot.data()");
      setReviewsData(snapshot.data());
    });

    return () => {
      unsubscribe();
    };
  }, [storageData.id, storageUser.id]);

  return (
    <>
      <div id="revInput" className="reviewCard__container">
        <label style={{ color: "var(--main_color)" }}>
          Write your comment here :
        </label>
        <textarea style={style} rows={3} ref={reviewRef}></textarea>
        <div className="d-flex justify-content-end">
          <button className="btn singOut-btn" onClick={submitComment}>
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
}
