"use client"

import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/ThemeSwitch';
import Header from '@/components/Header';
import ModalToCreateSpace from '@/components/ModalToCreateSpace';
import { Button, Dropdown, Tooltip } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import Sidebar from '@/components/sidebar/Sidebar';
import BGGradient from '@/components/BGGradient';
const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'bg-red-500 hover:bg-red-600',
    },
  },
};



const sampleData = [
  {
    id: "6564",
    title: "My Space",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { id: "123", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1234", name: "Ahmed", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    id: "casdwae23",
    title: "How can one grow online presence and make a huge out of it sad",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { id: "3123", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  // ... Add more data objects here
];


const spaceData = {
  coordinators: [
    {
      name: "Faroo Dad",
      img: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
      role: "Host",
    },
    {
      name: "Sarah",
      img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Co-Host",
      speaker: true,
    },
  ],
  users: [
    {
      name: "Farooq Dad",
      img: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
      role: "user",
      speaker: true,
    },
    {
      name: "Yarir khan",
      img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "user",
      speaker: false,
    },
    {
      name: "Sarah Khan",
      img: "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144",
      role: "user",
      speaker: false,
    }
  ],
  guest: ["Guest241", "Guest545", "Guest653", "Guest1231", "Guest77", "Guest124123", "Guest321", "Guest454"]
}

export default function Home() {
  const [showRoomWidget, setShowRoomWidget] = useState(false)


  const [isCreateSpaceModal, setIsCreateSpaceModal] = useState("hide")
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col pb-56 ml-20">

        {/* <div className="mt-4">
          <div className="shadow-md dark:shadow-gray-800 border dark:border-gray-700 p-8 rounded-lg bg-white dark:bg-gray-800">
            <div className="flex flex-wrap gap-6 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shadow-lg dark:shadow-gray-900 border dark:border-gray-700 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg
                    width={28}
                    height={28}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#a)">
                      <path
                        d="M27.727 14.322c0-.951-.077-1.908-.242-2.844H14.28v5.39h7.562a6.48 6.48 0 0 1-2.798 4.255v3.498h4.511c2.65-2.438 4.172-6.039 4.172-10.298Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M14.28 28.001c3.776 0 6.96-1.24 9.28-3.38l-4.511-3.498c-1.255.854-2.876 1.338-4.764 1.338-3.652 0-6.75-2.464-7.86-5.777H1.769v3.606A14.002 14.002 0 0 0 14.28 28Z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.42 16.684a8.386 8.386 0 0 1 0-5.36V7.716H1.77a14.012 14.012 0 0 0 0 12.573l4.65-3.606Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M14.28 5.541a7.608 7.608 0 0 1 5.37 2.1l3.998-3.998A13.455 13.455 0 0 0 14.28.001 13.997 13.997 0 0 0 1.77 7.717l4.65 3.606c1.106-3.318 4.208-5.782 7.86-5.782Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h28v28H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-gray-600 dark:text-white font-semibold">Google</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <button
                  aria-label="Bookmark button"
                  className="w-9 h-9 text-gray-300 dark:text-gray-400 shadow-md dark:shadow-gray-900 rounded-full border dark:border-gray-700 flex items-center justify-center duration-200 focus:shadow-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-end justify-between mt-6">
              <div className="space-y-4">
                <h4 className="text-gray-700 dark:text-gray-300 text-lg font-medium">
                  Senior Software engineer
                </h4>
                <div className="text-sm flex items-center gap-4 text-gray-500 dark:text-gray-400 lg:text-base">
                  <span className="text-gray-400 dark:text-gray-300 text-2xl">$</span>
                  $90,000 - $120,000
                </div>
                <div className="text-sm flex items-center gap-3 text-gray-500 dark:text-gray-400 lg:text-base">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 dark:text-gray-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  USA - Iowa - Johnston
                </div>
              </div>
              <span className="inline-block py-1.5 px-3 rounded-lg text-xs text-white font-semibold bg-indigo-600">
                Full-time
              </span>
            </div>
          </div>
        </div> */}
        <BGGradient />
        <Sidebar />

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-0 sm:-top-80 "
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
{/* 
        <div className="px-10">
          <div className="text-start">
            <h1 className="text-3xl tracking-tight sm:text-4xl font-semibold">
              Language Practice Community
            </h1>
          </div>
        </div> */}

        {/* <div className='mt-4 flex flex-wrap gap-x-2 gap-y-2 justify-center items-center '>
          <ModalToCreateSpace id="popup-modal" isCreateSpaceModal={isCreateSpaceModal} setIsCreateSpaceModal={setIsCreateSpaceModal} />
          <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-900">Community</button>

        </div> */}

        <div className="py-6 flex flex-wrap gap-x-6 ml-10 gap-y-5 flex-col lg:flex-row xl:gap-x-8   ">

          {sampleData.map((item, index) => (
            <div key={index} className="dark:shadow-md relative rounded-md bg-white dark:bg-gray-800 dark:border-gray-700 mr-10 lg:mr-0 lg:w-96 h-auto py-2 lg:h-80 border overflow-hidden ">


              <div className="flex flex-col px-6 py-3 ">
                <div className="w-full text-sm items-start">
                  <div className={`rounded-lg`}>
                    <div className='flex justify-between'>
                      <div className="grow ">
                        <div className=" mb-1 flex gap-1">
                          <h3 className="text-gray-600 dark:text-white font-semibold">English</h3>
                          <span className='text-sm opacity-40 '> Upper Advance</span>
                        </div>
                        <div className="mb-3 text-purple-500 dark:text-purple-400  font-semibold" title={item.title}>
                          {item.title.length > 35 ? `${item.title.slice(0, 35)}...` : item.title}
                        </div>
                      </div>
                      <h2>
                        <div className="text-right ">
                          {item.users.length % 2 ?
                            <Link href="/space/21323"
                              className="text-sm font-medium hover:text-purple-500 inline-flex items-center transition duration-150 ease-in-out group "
                            >
                              Join{/* */}{" "}
                              <svg className="w-4 h-4 ml-2 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                              </svg>
                            </Link> :
                            <div
                              className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group opacity-70"
                            >
                              Space is limited
                            </div>
                          }
                        </div>
                      </h2>

                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap overflow-hidden mb-2 ">
                  {item.users?.length > 0 &&
                    <>
                      {item.users?.map((user, imgIndex) => (
                        imgIndex < 9 && (
                          <Tooltip animation="duration-500" content={user.name}>
                            <div key={user.toString() + imgIndex} className='flex flex-col justify-center align-center items-center '>
                              <img key={imgIndex} className={`cursor-pointer ${item.users?.length <= 3 ? "h-24 w-24" : item.users?.length <= 8 ? "h-22 w-22" : "h-16 w-16"}  rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={user.imageUrl} alt="" />
                              <span className={'  text-purple-500 dark:text-purple-400 mt-1'} style={{ fontSize: "0.6rem" }}> {user.name == "Farooq Dad" ? "Sparktalk" : ""} {user.name !== "Farooq Dad" && user.name.length}</span>
                            </div>

                          </Tooltip>
                        )
                      ))}




                      {item.users?.length && item.users.length > 8 &&
                        <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                          {item.users.length}
                        </div>
                      }
                    </>
                  }
                </div>

              </div>
            </div>
          ))}

        </div>



      </main >
      
      <div className="fixed bottom-0 left-0 z-50 grid w-full h-16 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-[#1e272d] dark:border-gray-600">
        <div className="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">

          <p className="text-sm font-medium text-gray-900 mr-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
            </span>
          </p>
          <span className="text-sm">Created At: </span>

          <svg
            className="w-3 h-3 mx-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          <span className="text-sm">12:43 PM</span>
        </div>
        <div className="flex items-center justify-center mx-auto">

        </div>
        <div className="items-center justify-center ml-auto md:flex">
          <button
            data-tooltip-target="tooltip-participants"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-[#1e272d] dark:hover:bg-gray-600"
            onClick={() => setShowRoomWidget(!showRoomWidget)}>
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="sr-only">Show participants</span>
          </button>
          <div
            id="tooltip-participants"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Show participants
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-volume"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z" />
            </svg>
            <span className="sr-only">Adjust volume</span>
          </button>
          <div
            id="tooltip-volume"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Adjust volume
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-information"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Show information</span>
          </button>
          <div
            id="tooltip-information"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Show information
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>


        </div>


      </div>

      <div className="fixed bottom-16 right-0 ">
        {!showRoomWidget &&
          <div className='h-auto overflow-y-auto rounded-sm w-96 p-3 border dark:border-gray-600  bg-white dark:bg-[#1e272d]' style={{ maxHeight: "80vh" }}>
            <div className="flex justify-between ">

              <div className="">
                <p className="mt-1">
                  English
                  <span className='text-sm opacity-40 '> Upper Advance</span>
                </p>
                <h3 className="cursor-pointer  text-purple-400">
                  How can one grow online presence and make a huge out of it sad
                </h3>

                <div className='my-2 text-sm'>Co-ordinators {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.coordinators.map((item, index) => {
                    return (
                      <>
                        {(item.role == "Host" || item.role == "Co-Host") &&
                          <div className='flex flex-col justify-center align-center items-center'>
                            <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.img} alt="" />
                            <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
                              {item.name.length % 2 ? "⭐" : ""} {item.role}</span>
                          </div>
                        }
                      </>
                    )
                  })}
                </div>


                <div className='my-2 text-sm'>Users {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.users.map((item, index) => {
                    return (
                      <>
                        <div className='flex flex-col justify-center align-center items-center'>
                          <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.img} alt="" />
                          <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
                            {item.name.length % 2 ? "⭐" : ""} {item.name}</span>
                        </div>
                      </>
                    )
                  })}
                </div>

                <div className='my-2 text-sm'>Guest Users {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.guest.map((item, index) => {
                    return (
                      <>
                        <div title={item} className='flex flex-col justify-center align-center items-center'>
                          <div className={`inline-block bg-purple-400 h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#272F34]`}></div>
                          <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>{item.slice(0, 4)}..</span>
                        </div>
                      </>
                    )
                  })}
                </div>


              </div>
              <p className="text-sm font-medium text-gray-900">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
                </span>
              </p>



            </div>
          </div>
        }
      </div>
    </>
  )
}
