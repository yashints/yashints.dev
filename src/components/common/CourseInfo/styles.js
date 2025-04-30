import styled from 'styled-components';

export const WRAPPER = styled.div`
  display: flex;
  padding: 2rem 0;

  :modal {
    border: 2px solid #ddd;
    border-radius: 5px;
    min-width: 600px;
    display: flex;
    flex-direction: column;
    padding: 0;

    .modal-header {
      display: flex;
      justify-content: end;
      padding: 0.4em;
    }

    .modal-content {
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .modal-banner {
      display: flex;
      justify-content: center;
      p {
        font-size: 6em;
        margin-bottom: 0;
        margin-top: -50px;
      }
    }

    .share {
      font-size: 0.8em;
      border: solid 1px #ddd;
      border-radius: 15px;
      font-weight: 500;
      button {
        background-color: rgb(109, 108, 209);
        color: white;
        border-radius: 15px;
        width: 100px;
        padding: 0.5em;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      span {
        padding: 0.5em;
        color: #555;
      }
    }

    .soacial-share {
      margin-top: 2em;
      display: flex;
      gap: 1em;
      button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: 50%;
        padding: 1em;
        img {
          width: 24px;
          height: 24px;
          margin-bottom: 0;
        }
      }
    }

    button {
      border: 0;
      background-color: transparent;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

export const LEFT = styled.div`
  flex: 2 1 0;
  padding-right: 1em;

  p {
    font-size: 0.8em;
    margin-bottom: 0;
    line-height: 1.25;
  }

  .tag {
    display: flex;
    justify-content: space-between;
  }
  .tag-line {
    max-width: 70%;
    font-size: 0.9rem;
  }

  .author {
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      margin-bottom: 0;
      margin-right: 15px;
    }
    .rating {
      .reviews {
        margin-left: -3px;
      }
    }
  }

  .credits {
    margin-left: auto;
  }

  .included {
    padding-top: 1em;
    margin-top: 1em;
    border-top: 1px solid #ddd;

    .inclist {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      p {
        width: 400px;
        line-height: 2;
      }
    }
  }

  .exp,
  .goals {
    padding-top: 1em;
    margin-top: 1em;
    border-top: 1px solid #ddd;
  }

  .goals {
    padding: 1em;
    color: #262626;
    background-color: #fff8e3;
    border: 0;
    border-radius: 10px;
  }

  .goallist {
    list-style: none;
    line-height: 1.1;
    margin: 0;
    font-size: 0.8em;
  }

  .details {
    margin-top: 1em;

    div {
      margin-bottom: 1em;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 1em;
      color: #262626;
      background-color: rgb(247, 248, 249);
      border: 0;
      border-radius: 10px;
      h5 {
        margin-bottom: 0;
        min-width: 200px;
      }
    }
  }
`;

export const RIGHT = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  max-width: 300px;
  min-height: 300px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

export const BOXHEADER = styled.div`
  background-color: #f0f2ff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 1em;
  display: flex;
  justify-content: space-between;

  h4 {
    margin-bottom: 0;
  }

  button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 0;
  }
`;

export const PRICE = styled.div`
  padding: 1em;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    align-items: end;
  }

  b {
    font-size: 1.3em;
  }

  p {
    font-size: 0.8rem;
    font-weight: 400;
    color: #262626;
    margin-left: 10px;
    margin-bottom: 5px;
  }

  > div:nth-child(2) {
    background-color: rgb(255, 224, 130);
    padding: 0 1em;
    font-size: 12px;
    font-weight: 500;
  }
`;

export const INCLUDED = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding: 1em;

  p {
    font-size: 14px;
    margin-bottom: 0;
    color: #555;
    font-weight: 450;
  }
`;

export const GETINTOUCH = styled.div`
  display: flex;
  padding: 0.5em;
  justify-content: center;

  button {
    display: flex;
    cursor: pointer;
    flex-grow: 1;
    justify-content: center;
    border-radius: 15px;
    border: 0;
    padding: 0.3em;
    font-weight: 500;
    color: white;
    background-color: rgb(109, 108, 209);
  }
`;
