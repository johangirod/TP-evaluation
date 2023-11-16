//  ❌ NE PAS MODIFIER POUR L'EVALUATION

import { JSDOM } from "jsdom";
import { beforeAll, describe, expect, it } from "vitest";
import { getRandonnees } from "../src/models/randonnees.js";

const SERVER_HOST = "http://localhost:3000";
describe("Exercice 1", () => {
  it("Servir le dossier image (1 pt)", async () => {
    const res = await fetch(`${SERVER_HOST}/img/tarn.jpg`);
    expect(res.headers.get("content-type")).toBe("image/jpeg");
    expect(res.status).toBe(200);
  });

  it("Servir la page d'accueil (1pt)", async () => {
    const res = await fetch(`${SERVER_HOST}/`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());
    expect(dom.window.document.title).toBe("RandoTarn");
    expect(
      dom.window.document
        .querySelector("[data-test-id=home-title]")
        ?.textContent?.trim()
    ).not.toBeFalsy();
  });
});

describe("Exercice 2", () => {
  let randonnees: Awaited<ReturnType<typeof getRandonnees>>;
  let res: Response;
  let dom: JSDOM;

  beforeAll(async () => {
    res = await fetch(`${SERVER_HOST}/randonnees`);
    dom = new JSDOM(await res.text());
    randonnees = await getRandonnees();
  });

  it("Créer une route /randonnees", async () => {
    expect(res.status).toBe(200);
  });

  it("Avec pour titre « Toutes les randonnées - RandoTarn »", async () => {
    expect(dom.window.document.title).toBe("Toutes les randonnées - RandoTarn");
  });

  it("Avec une liste de randonnées : titre - 1pt", async () => {
    const titres = Array.from(
      dom.window.document.querySelectorAll("[data-test-id=titre]")
    ).map((el) => el.textContent?.trim());

    expect(titres).to.have.same.members(randonnees.map((r) => r.title));
  });

  it("Avec une liste de randonnées : lieu - 1pt", async () => {
    const lieux = Array.from(
      dom.window.document.querySelectorAll("[data-test-id=lieu]")
    ).map((el) => el.textContent?.trim());

    expect(lieux).to.have.same.members(randonnees.map((r) => r.place));
  });

  it("Avec une liste de randonnées : lien - 1pt", async () => {
    const links = Array.from(
      dom.window.document.querySelectorAll("a[data-test-id=lien]")
    ).map((el) => el.getAttribute("href"));
    expect(links).to.have.same.members(
      randonnees.map((r) => `/randonnees/${r.id}/avis`)
    );
  });

  it("Avec une liste de randonnées : photo - 1pt", async () => {
    const photos = Array.from(
      dom.window.document.querySelectorAll("[data-test-id=photo]")
    ).map((el) => el.getAttribute("src"));
    expect(photos).to.have.same.members(randonnees.map((r) => r.pictureUrl));
  });
});

describe("Exercice 3", () => {
  it("Créer la route `/randonnees/:id/avis` - 1pt", async () => {
    const res = await fetch(`${SERVER_HOST}/randonnees/2/avis`);
    expect(res.status).toBe(200);
    const dom = new JSDOM(await res.text());
    expect(
      dom.window.document.querySelector("[data-test-id=titre-avis]")
    ).not.toBeFalsy();
  });

  it("Modifier la fonction getAvisByRandoneeId pour qu'elle retourne les avis d'une randonnée - 3 pt", async () => {
    const res = await fetch(`${SERVER_HOST}/randonnees/2/avis`);
    const dom = new JSDOM(await res.text());
    const avis = Array.from(
      dom.window.document.querySelectorAll("[data-test-id^=avis-]")
    );
    const avisText = avis.map((a) => a.textContent?.trim());
    expect(avis).to.have.length.greaterThanOrEqual(2);
    expect(
      avisText.some(
        (a) =>
          a?.includes("Au départ des ruines du château d’Arifat") &&
          a?.includes("Le 24 août 2023")
      )
    ).toBe(true);
    expect(
      avisText.some(
        (a) =>
          a?.includes("Magnifique randonnée, très bien balisée") &&
          a?.includes("Le 5 septembre 2023")
      )
    ).toBe(true);
  });
});
