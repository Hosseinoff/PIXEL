/* ========================================
   PIXEL STUDIO
   JAVASCRIPT
======================================== */


document.addEventListener(
  "DOMContentLoaded",
  () => {


    /* =====================================
       YEAR
    ===================================== */

    const year =
      document.getElementById("year");


    if (year) {

      year.textContent =
        new Date().getFullYear();

    }



    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton =
      document.querySelector(
        ".menu-toggle"
      );


    const navigation =
      document.querySelector(
        ".nav-pill"
      );


    if (
      menuButton &&
      navigation
    ) {


      menuButton.addEventListener(
        "click",
        () => {


          const isOpen =
            navigation.classList.toggle(
              "open"
            );


          menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
          );


        }
      );


      document
        .querySelectorAll(
          ".nav-pill a"
        )
        .forEach(
          link => {


            link.addEventListener(
              "click",
              () => {


                navigation.classList.remove(
                  "open"
                );


                menuButton.setAttribute(
                  "aria-expanded",
                  "false"
                );


              }
            );


          }
        );


    }



    /* =====================================
       ACTIVE NAV
    ===================================== */

    const sections =
      [
        ...document.querySelectorAll(
          "main section[id]"
        )
      ];


    const navLinks =
      [
        ...document.querySelectorAll(
          ".nav-pill a"
        )
      ];


    const observer =
      new IntersectionObserver(
        entries => {


          const visible =
            entries
              .filter(
                entry =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];


          if (!visible)
            return;


          navLinks.forEach(
            link => {


              const target =
                link.getAttribute(
                  "href"
                );


              link.classList.toggle(
                "active",
                target ===
                "#" +
                visible.target.id
              );


            }
          );


        },
        {
          threshold:
            [0.2, 0.5, 0.8]
        }
      );


    sections.forEach(
      section => {

        observer.observe(
          section
        );

      }
    );



    /* =====================================
       SMOOTH ANCHOR SCROLL
    ===================================== */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        link => {


          link.addEventListener(
            "click",
            event => {


              const targetId =
                link.getAttribute(
                  "href"
                );


              if (
                !targetId ||
                targetId === "#"
              ) {

                return;

              }


              const target =
                document.querySelector(
                  targetId
                );


              if (!target)
                return;


              event.preventDefault();


              target.scrollIntoView({
                behavior:
                  "smooth",
                block:
                  "start"
              });


            }
          );


        }
      );



    /* =====================================
       PROJECT FORM
    ===================================== */

    const form =
      document.getElementById(
        "projectForm"
      );


    const status =
      document.getElementById(
        "formStatus"
      );


    if (
      form &&
      status
    ) {


      form.addEventListener(
        "submit",
        async event => {


          event.preventDefault();


          const button =
            form.querySelector(
              ".submit-btn"
            );


          const formData =
            new FormData(form);


          const name =
            String(
              formData.get("name") ||
              ""
            ).trim();


          const phone =
            String(
              formData.get("phone") ||
              ""
            ).trim();


          const email =
            String(
              formData.get("email") ||
              ""
            ).trim();


          const message =
            String(
              formData.get("message") ||
              ""
            ).trim();


          /* ---------------------------
             REQUIRED VALIDATION
          ---------------------------- */


          if (
            !name ||
            !phone ||
            !email ||
            !message
          ) {


            status.textContent =
              "لطفاً همه فیلدهای ضروری را کامل کنید.";


            status.style.color =
              "#ff9d5a";


            return;

          }



          /* ---------------------------
             EMAIL VALIDATION
          ---------------------------- */


          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


          if (
            !emailRegex.test(
              email
            )
          ) {


            status.textContent =
              "لطفاً یک ایمیل معتبر وارد کنید.";


            status.style.color =
              "#ff9d5a";


            return;

          }



          /* ---------------------------
             PHONE VALIDATION
          ---------------------------- */


          const phoneClean =
            phone.replace(
              /[\s-]/g,
              ""
            );


          const phoneRegex =
            /^(\+98|0098|09)\d{9,11}$/;


          if (
            !phoneRegex.test(
              phoneClean
            )
          ) {


            status.textContent =
              "لطفاً شماره تماس معتبر وارد کنید.";


            status.style.color =
              "#ff9d5a";


            return;

          }



          /* ---------------------------
             LOADING
          ---------------------------- */


          const originalText =
            button.innerHTML;


          button.disabled =
            true;


          button.innerHTML =
            "در حال ارسال...";


          status.textContent =
            "در حال ارسال درخواست شما...";


          status.style.color =
            "#ffb16d";



          /* ---------------------------
             SEND
          ---------------------------- */


          try {


            const response =
              await fetch(
                "https://formsubmit.co/ajax/hossein.tavakoli.one@gmail.com",
                {

                  method:
                    "POST",

                  headers: {

                    "Accept":
                      "application/json"

                  },

                  body:
                    formData

                }
              );


            const result =
              await response.json();


            if (
              response.ok &&
              result.success
            ) {


              status.textContent =
                "✓ درخواست شما با موفقیت ارسال شد.";


              status.style.color =
                "#62e6a7";


              form.reset();


            } else {


              throw new Error(
                "Submission failed"
              );


            }


          } catch (error) {


            console.error(
              "Form error:",
              error
            );


            status.textContent =
              "ارسال انجام نشد. لطفاً دوباره تلاش کنید.";


            status.style.color =
              "#ff7272";


          } finally {


            button.disabled =
              false;


            button.innerHTML =
              originalText;


          }


        }
      );


    }



    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
      document.querySelectorAll(
        ".section, .request-box, .service-card, .project"
      );


    revealElements.forEach(
      element => {

        element.style.opacity =
          "0";

        element.style.transform =
          "translateY(25px)";

        element.style.transition =
          "opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1)";

      }
    );


    const revealObserver =
      new IntersectionObserver(
        entries => {


          entries.forEach(
            entry => {


              if (
                !entry.isIntersecting
              )
                return;


              entry.target.style.opacity =
                "1";


              entry.target.style.transform =
                "translateY(0)";


              revealObserver.unobserve(
                entry.target
              );


            }
          );


        },
        {
          threshold:
            0.08
        }
      );


    revealElements.forEach(
      element => {

        revealObserver.observe(
          element
        );

      }
    );



    /* =====================================
       CURSOR GLOW
    ===================================== */

    const glow =
      document.createElement(
        "div"
      );


    glow.className =
      "cursor-glow";


    document.body.appendChild(
      glow
    );


    document.addEventListener(
      "mousemove",
      event => {


        glow.style.left =
          event.clientX + "px";


        glow.style.top =
          event.clientY + "px";


      }
    );


  }
);