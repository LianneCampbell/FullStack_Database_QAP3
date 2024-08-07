PGDMP  8    -                |           online_bookstore    16.2    16.2 +    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16932    online_bookstore    DATABASE     �   CREATE DATABASE online_bookstore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
     DROP DATABASE online_bookstore;
                postgres    false            �            1259    16941    author    TABLE     }   CREATE TABLE public.author (
    author_id integer NOT NULL,
    name character varying(255) NOT NULL,
    biography text
);
    DROP TABLE public.author;
       public         heap    postgres    false            �            1259    16940    author_author_id_seq    SEQUENCE     �   CREATE SEQUENCE public.author_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.author_author_id_seq;
       public          postgres    false    216            �           0    0    author_author_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.author_author_id_seq OWNED BY public.author.author_id;
          public          postgres    false    215            �            1259    16950    book    TABLE     �   CREATE TABLE public.book (
    book_id integer NOT NULL,
    title character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    genre character varying(100) NOT NULL,
    author_id integer
);
    DROP TABLE public.book;
       public         heap    postgres    false            �            1259    16949    book_book_id_seq    SEQUENCE     �   CREATE SEQUENCE public.book_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.book_book_id_seq;
       public          postgres    false    218            �           0    0    book_book_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.book_book_id_seq OWNED BY public.book.book_id;
          public          postgres    false    217            �            1259    16962    customer    TABLE     �   CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �            1259    16961    customer_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.customer_customer_id_seq;
       public          postgres    false    220            �           0    0    customer_customer_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.customer_customer_id_seq OWNED BY public.customer.customer_id;
          public          postgres    false    219            �            1259    16983 	   orderitem    TABLE     �   CREATE TABLE public.orderitem (
    order_item_id integer NOT NULL,
    order_id integer,
    book_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);
    DROP TABLE public.orderitem;
       public         heap    postgres    false            �            1259    16982    orderitem_order_item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orderitem_order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.orderitem_order_item_id_seq;
       public          postgres    false    224            �           0    0    orderitem_order_item_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.orderitem_order_item_id_seq OWNED BY public.orderitem.order_item_id;
          public          postgres    false    223            �            1259    16971 
   totalorder    TABLE     �   CREATE TABLE public.totalorder (
    order_id integer NOT NULL,
    order_date date NOT NULL,
    customer_id integer,
    total_amount numeric(10,2) NOT NULL
);
    DROP TABLE public.totalorder;
       public         heap    postgres    false            �            1259    16970    totalorder_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.totalorder_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.totalorder_order_id_seq;
       public          postgres    false    222            �           0    0    totalorder_order_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.totalorder_order_id_seq OWNED BY public.totalorder.order_id;
          public          postgres    false    221            .           2604    16944    author author_id    DEFAULT     t   ALTER TABLE ONLY public.author ALTER COLUMN author_id SET DEFAULT nextval('public.author_author_id_seq'::regclass);
 ?   ALTER TABLE public.author ALTER COLUMN author_id DROP DEFAULT;
       public          postgres    false    216    215    216            /           2604    16953    book book_id    DEFAULT     l   ALTER TABLE ONLY public.book ALTER COLUMN book_id SET DEFAULT nextval('public.book_book_id_seq'::regclass);
 ;   ALTER TABLE public.book ALTER COLUMN book_id DROP DEFAULT;
       public          postgres    false    218    217    218            0           2604    16965    customer customer_id    DEFAULT     |   ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.customer_customer_id_seq'::regclass);
 C   ALTER TABLE public.customer ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    220    219    220            2           2604    16986    orderitem order_item_id    DEFAULT     �   ALTER TABLE ONLY public.orderitem ALTER COLUMN order_item_id SET DEFAULT nextval('public.orderitem_order_item_id_seq'::regclass);
 F   ALTER TABLE public.orderitem ALTER COLUMN order_item_id DROP DEFAULT;
       public          postgres    false    224    223    224            1           2604    16974    totalorder order_id    DEFAULT     z   ALTER TABLE ONLY public.totalorder ALTER COLUMN order_id SET DEFAULT nextval('public.totalorder_order_id_seq'::regclass);
 B   ALTER TABLE public.totalorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    222    221    222            �          0    16941    author 
   TABLE DATA           <   COPY public.author (author_id, name, biography) FROM stdin;
    public          postgres    false    216   �0       �          0    16950    book 
   TABLE DATA           G   COPY public.book (book_id, title, price, genre, author_id) FROM stdin;
    public          postgres    false    218   �1       �          0    16962    customer 
   TABLE DATA           F   COPY public.customer (customer_id, name, email, password) FROM stdin;
    public          postgres    false    220   �2       �          0    16983 	   orderitem 
   TABLE DATA           V   COPY public.orderitem (order_item_id, order_id, book_id, quantity, price) FROM stdin;
    public          postgres    false    224   3       �          0    16971 
   totalorder 
   TABLE DATA           U   COPY public.totalorder (order_id, order_date, customer_id, total_amount) FROM stdin;
    public          postgres    false    222   %3       �           0    0    author_author_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.author_author_id_seq', 5, true);
          public          postgres    false    215            �           0    0    book_book_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.book_book_id_seq', 6, true);
          public          postgres    false    217            �           0    0    customer_customer_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.customer_customer_id_seq', 8, true);
          public          postgres    false    219            �           0    0    orderitem_order_item_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.orderitem_order_item_id_seq', 1, false);
          public          postgres    false    223            �           0    0    totalorder_order_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.totalorder_order_id_seq', 6, true);
          public          postgres    false    221            4           2606    16948    author author_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.author
    ADD CONSTRAINT author_pkey PRIMARY KEY (author_id);
 <   ALTER TABLE ONLY public.author DROP CONSTRAINT author_pkey;
       public            postgres    false    216            6           2606    16955    book book_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_pkey PRIMARY KEY (book_id);
 8   ALTER TABLE ONLY public.book DROP CONSTRAINT book_pkey;
       public            postgres    false    218            8           2606    16969    customer customer_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (customer_id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    220            <           2606    16988    orderitem orderitem_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.orderitem
    ADD CONSTRAINT orderitem_pkey PRIMARY KEY (order_item_id);
 B   ALTER TABLE ONLY public.orderitem DROP CONSTRAINT orderitem_pkey;
       public            postgres    false    224            :           2606    16976    totalorder totalorder_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.totalorder
    ADD CONSTRAINT totalorder_pkey PRIMARY KEY (order_id);
 D   ALTER TABLE ONLY public.totalorder DROP CONSTRAINT totalorder_pkey;
       public            postgres    false    222            =           2606    16956    book book_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.book
    ADD CONSTRAINT book_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.author(author_id);
 B   ALTER TABLE ONLY public.book DROP CONSTRAINT book_author_id_fkey;
       public          postgres    false    216    218    4660            ?           2606    16994     orderitem orderitem_book_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderitem
    ADD CONSTRAINT orderitem_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.book(book_id);
 J   ALTER TABLE ONLY public.orderitem DROP CONSTRAINT orderitem_book_id_fkey;
       public          postgres    false    4662    224    218            @           2606    16989 !   orderitem orderitem_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orderitem
    ADD CONSTRAINT orderitem_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.totalorder(order_id);
 K   ALTER TABLE ONLY public.orderitem DROP CONSTRAINT orderitem_order_id_fkey;
       public          postgres    false    222    224    4666            >           2606    16977 &   totalorder totalorder_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.totalorder
    ADD CONSTRAINT totalorder_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);
 P   ALTER TABLE ONLY public.totalorder DROP CONSTRAINT totalorder_customer_id_fkey;
       public          postgres    false    220    4664    222            �     x�]�1O�0���W��%�T� c*� �J��b�kb�ܡ��(�z.�*���;��=�d�� �Ȉ!dj��-�PE�ct�Y}� ��[pTC%>�*��x$8�@�#�,]��;�����Y��]���ޚ��ɖz����HW�~(9|1*l~�*Wc?3>P��C��c����T���I|�f�f���g�`O��0���Q|��!����l(XqC��k��{aQ��W)�t�r	asBJqa�Rk<[(y
���gh	w��x��D&x�-/kޭ1��児      �   �   x�M��
�0Eg�+�&N���}�1�v����d�������rι�W�^�)��up�l1�и }T�q3R�<�zX�K�l+i�ф	B�oW���B�/{6�Rd��F�De)=|�"jo�Fx�[�P���s���8C��9��2�      �   j   x�3�����Sp�O��2R+srR���s9S�*JRS
����R����8��R�s3K28��L�ZLL͸�9s2�S@6��q&�x���[Xr��qqq ��7�      �      x������ � �      �   8   x�Eʱ  �:ޅ�1�.�?���ׅ���Ų���zS�*�I�/Y2�$����     