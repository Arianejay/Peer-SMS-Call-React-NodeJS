import React from "react";
import styles from "../stylesheets/main.module.scss";

import Header from "../components/Header";
import Form from "../components/Form";
import Log from "../components/Log";

const Home: React.FC = () => {
    return (
        <div className={styles.home__container}>
            <Header />
            <div className={styles.home__hero}>
                <h1>Peer SMS and Call</h1>
                <p>
                    Send free text messages to your friends, and connect with
                    them with a free phone call.
                </p>
            </div>
            <Form limit={20} />
            <Log />
        </div>
    );
};

export default Home;
