--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommendations (
    id integer NOT NULL,
    name text,
    "youtubeLink" text,
    score integer DEFAULT 0,
    genres text[]
);


--
-- Name: recommendations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recommendations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommendations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recommendations_id_seq OWNED BY public.recommendations.id;


--
-- Name: recommendations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations ALTER COLUMN id SET DEFAULT nextval('public.recommendations_id_seq'::regclass);


--
-- Data for Name: recommendations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.recommendations VALUES (1, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 124, NULL);
INSERT INTO public.recommendations VALUES (2, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', -3, NULL);
INSERT INTO public.recommendations VALUES (3, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 15, NULL);
INSERT INTO public.recommendations VALUES (4, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 8, NULL);
INSERT INTO public.recommendations VALUES (5, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 2, NULL);
INSERT INTO public.recommendations VALUES (6, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 14, NULL);
INSERT INTO public.recommendations VALUES (7, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 1, NULL);
INSERT INTO public.recommendations VALUES (8, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 4, NULL);
INSERT INTO public.recommendations VALUES (9, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 2, NULL);
INSERT INTO public.recommendations VALUES (10, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 9, NULL);
INSERT INTO public.recommendations VALUES (11, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 40, NULL);
INSERT INTO public.recommendations VALUES (12, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 60, NULL);
INSERT INTO public.recommendations VALUES (13, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 63, NULL);
INSERT INTO public.recommendations VALUES (14, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 8, NULL);
INSERT INTO public.recommendations VALUES (15, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', -2, NULL);
INSERT INTO public.recommendations VALUES (16, 'fulano_de_tal', 'https://www.youtube.com/watch?v=hir8IGWYxfE', 124, NULL);


--
-- Name: recommendations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recommendations_id_seq', 16, true);


--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

