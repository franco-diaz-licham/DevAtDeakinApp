import { Timestamp } from "firebase/firestore";
import article1 from "../../../assets/article1.jpg";
import article2 from "../../../assets/article2.jpg";
import article3 from "../../../assets/article3.jpg";
import tutotial1 from "../../../assets/tutorial1.jpg";
import tutotial2 from "../../../assets/tutorial2.jpg";
import tutotial3 from "../../../assets/tutorial3.jpg";
import type { ArticleModel } from "../../articles/types/article.model";

export const articles: ArticleModel[] = [
    {
        id: "1",
        title: "Lorem ipsum dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 4.0,
        imageUrl: article1,
        uid: "",
        author: "Yak Tompshon",
        createdAt: new Timestamp(1, 1),
    },
    {
        id: "2",
        title: "Dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 5.0,
        imageUrl: article2,
        uid: "",
        author: "Paul Waks",
        createdAt: new Timestamp(1, 1),
    },
    {
        id: "3",
        title: "Lorem ipsum dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 4.0,
        imageUrl: article3,
        uid: "",
        author: "Eli McNah",
        createdAt: new Timestamp(1, 1),
    },
];

export const tutorials: ArticleModel[] = [
    {
        id: "4",
        title: "Lorem ipsum dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 3.1,
        imageUrl: tutotial1,
        uid: "",
        author: "Franco Diaz",
        createdAt: new Timestamp(1, 1),
    },
    {
        id: "5",
        title: "Lorem ipsum dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 3.1,
        imageUrl: tutotial2,
        uid: "",
        author: "Mark Jackson",
        createdAt: new Timestamp(1, 1),
    },
    {
        id: "6",
        title: "Lorem ipsum dolor sit amet",
        abstract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, incidunt.",
        articleText: "",
        tags: "",
        rating: 3.3,
        imageUrl: tutotial3,
        uid: "",
        author: "Matthew Nat",
        createdAt: new Timestamp(1, 1),
    },
];
