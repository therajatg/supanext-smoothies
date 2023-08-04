"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly!");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update([{ title, method, rating }])
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in all the fields correctly!");
      console.log(error);
    }

    if (data) {
      setFormError("");
      console.log(data);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchSmoothie();
  }, [id, router]);

  const fetchSmoothie = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      router.replace("/");
    }

    if (data) {
      setTitle(data.title);
      setMethod(data.method);
      setRating(data.rating);
      console.log(data);
    }
  };

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
