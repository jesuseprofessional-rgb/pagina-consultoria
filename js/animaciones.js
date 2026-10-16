document.addEventListener("DOMContentLoaded", () => {
    const selectores = [
        /* Mentoría académica */
        ".mentoria-hero-content > *",
        ".mentoria-hero-visual",
        ".mentoria-section-heading",
        ".challenge-card",
        ".mentoria-offer-image",
        ".mentoria-offer-content > *",
        ".include-item",
        ".mentoria-process-step",
        ".mentoria-about-content > *",
        ".mentoria-about-image",
        ".faq-item",
        ".mentoria-contact-content > *",

        /* Página principal */
        ".trust-item",
        ".section-heading",
        ".service-card",
        ".about-image",
        ".about-content > *",
        ".process-step",
        ".contact-cta-content > *",
        ".contact-cta-image",

        /* Portada de consultoría empresarial */
        ".business-hero-content > *",
        ".business-hero-visual",

        /* Áreas de trabajo */
        ".business-section-heading",
        ".business-area-card",

        /* Portafolio */
        ".business-portfolio-heading > *",
        ".portfolio-card",
        ".portfolio-disclaimer",

        /* Soluciones personalizadas */
        ".business-custom-image",
        ".business-custom-content > *",

        /* Metodología */
        ".business-process-step",

        /* Contacto */
        ".business-contact-content > *"

      
    ];

    const elementos = [
        ...new Set(
            selectores.flatMap(selector =>
                [...document.querySelectorAll(selector)]
            )
        )
    ];

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducirMovimiento ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }

    elementos.forEach(elemento => {
        elemento.classList.add("reveal");

        /* Dirección de entrada */
        if (
            elemento.matches(
                ".business-hero-visual, " +
                ".about-image, " +
                ".contact-cta-image, " +
                ".business-custom-image"
            )
        ) {
            elemento.classList.add("reveal-left");
        }

        if (
            elemento.matches(
                ".business-hero-content > *, " +
                ".business-custom-content > *"
            )
        ) {
            elemento.classList.add("reveal-right");
        }

        /* Aparición escalonada dentro de cada grupo */
        if (
            elemento.matches(
                ".service-card, " +
                ".process-step, " +
                ".trust-item, " +
                ".business-area-card, " +
                ".portfolio-card, " +
                ".business-process-step"
            )
        ) {
            const hermanos = [
                ...elemento.parentElement.children
            ].filter(hermano =>
                hermano.matches(
                    ".service-card, " +
                    ".process-step, " +
                    ".trust-item, " +
                    ".business-area-card, " +
                    ".portfolio-card, " +
                    ".business-process-step"
                )
            );

            const posicion = hermanos.indexOf(elemento);

            elemento.style.setProperty(
                "--reveal-delay",
                `${ posicion * 120 } ms`
            );
        }
    });

    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    elementos.forEach(elemento => {
        observador.observe(elemento);
    });
});