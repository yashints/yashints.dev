import React, { useRef } from 'react';
import { navigate } from 'gatsby';
import {
  WRAPPER,
  LEFT,
  RIGHT,
  BOXHEADER,
  PRICE,
  INCLUDED,
  GETINTOUCH,
} from './styles';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import share from 'Static/icons/send.png';

import kids from 'Static/courses/kids.png';
import pythonTeens from 'Static/courses/kidsphyton.png';
import genai from 'Static/courses/ai.png';
import pythonfull from 'Static/courses/python.png';
import dotnet from 'Static/courses/dotnet.png';
import js from 'Static/courses/js.png';
import html from 'Static/courses/html.png';
import react from 'Static/courses/react.png';
import devops from 'Static/courses/devops.png';

const imageMap = new Map([
  [1, kids],
  [2, kids],
  [3, kids],
  [4, pythonTeens],
  [5, genai],
  [6, pythonfull],
  [7, dotnet],
  [8, js],
  [9, html],
  [10, react],
  [11, devops],
]);

export const CourseInfo = ({ courseInfo }) => {
  if (!courseInfo) return;
  const modalRef = useRef(null);
  const contactMe = (e) => {
    navigate('/contact', {
      state: {
        message: e.target.getAttribute('data-coursename'),
      },
    });
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(location.href);
    alert('Text copied to clipboard');
  };

  const show = (e) => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const close = (e) => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <WRAPPER>
      <LEFT>
        <div>
          <h2>{courseInfo.name}</h2>
          <div className="tag">
            <p className="tag-line">{courseInfo.description}</p>
            <img
              width={150}
              height={150}
              src={imageMap.get(courseInfo.image)}
              alt={courseInfo.name}
            />
          </div>
          <div className="author">
            <img width={50} height={50} src="/me.jpg" alt="Yas Adel Mehraban" />
            <div className="rating">
              <p>Yas Adel Mehraban</p>
              <p className="reviews">
                {' '}
                ⭐ <b>{courseInfo.rating}</b> ({courseInfo.reviews}){' '}
              </p>
            </div>
            <div className="credits">
              <p>Microsoft Certified Trainer</p>
              <p>Principal Software Engineer</p>
            </div>
          </div>
        </div>
        <div className="included">
          <h2>What's included</h2>
          <div className="inclist">
            {courseInfo.included.map((c, i) => (
              <p key={`include${i}`}> {c} </p>
            ))}
          </div>
        </div>

        <div className="exp">
          <h2>Class experience</h2>
          <p>
            In this fun-filled class, kids will embark on a journey of discovery
            where learning feels like play. Guided by interactive lessons,
            they’ll dive into visual programming tools like Scratch,
            experimenting with colorful blocks to bring their ideas to life.
            Each session includes engaging activities, from creating animations
            and games to solving simple coding challenges. Through teamwork,
            creativity, and hands-on exploration, kids will build confidence in
            problem-solving and logical thinking—all while having a great time
            in a supportive and energetic environment. They’ll leave each class
            excited for what they’ll create next!
          </p>
        </div>
        <div className="goals">
          <h2>Learning goals</h2>
          <ul className="goallist">
            {courseInfo.learningGoals.map((c, i) => (
              <li key={`goal${i}`}> 🎯 {c} </li>
            ))}
          </ul>
        </div>
        <div className="details">
          <h2>Other details</h2>
          <div>
            <h5> 👩‍💻 Parental guidance</h5>
            <p>
              Notice that the use of 3rd party tools is required and parents
              might need to purchase the license.
            </p>
          </div>
          <div>
            <h5> 📦 Supply list</h5>
            <p>
              Learners need to have access to a laptop/notebook/pc for this
              course. Tablets are not recommended!!!
            </p>
          </div>
          <div>
            <h5> 👩‍💻 External resources</h5>
            <p>
              Learners might need access to other external resources, parental
              permission will be requested beforehand.
            </p>
          </div>
        </div>
      </LEFT>
      <RIGHT>
        <BOXHEADER>
          <h4>Instructor-Led</h4>
          <button type="button" title="Share course" onClick={show}>
            <img src={share} alt="Share course" />
          </button>
        </BOXHEADER>
        <PRICE>
          <div>
            <b>A{courseInfo.price} </b>
            <p>p/lesson</p>
          </div>
          <div> Group classes available - Huge saving!!! </div>
        </PRICE>
        <INCLUDED>
          {courseInfo.included.map((s, i) => (
            <p key={`includedExpand${i}`}>{s}</p>
          ))}
        </INCLUDED>
        <GETINTOUCH>
          <button data-coursename={courseInfo.name} onClick={contactMe}>
            Get in touch
          </button>
        </GETINTOUCH>
      </RIGHT>
      <dialog ref={modalRef} className="modal">
        <div className="modal-header">
          <button type="button" onClick={close}>
            X
          </button>
        </div>
        <div className="modal-content">
          <h3>Share this course with a friend!</h3>
          <div className="modal-banner">
            <p> 🎁 </p>
          </div>
          <div className="share">
            <span>{location.href}</span>
            <button type="button" onClick={copyToClipBoard}>
              Copy
            </button>
          </div>
          <div className="soacial-share">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TelegramShareButton url={window.location.href}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>
        </div>
      </dialog>
    </WRAPPER>
  );
};
