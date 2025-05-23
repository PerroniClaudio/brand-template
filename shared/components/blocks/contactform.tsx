// contactform component file

"use client";

import { urlFor } from "@/shared/sanity/lib/image";
import { Image } from "sanity"; // Import the Image type from Sanity
import PortableTextRenderer from "@/shared/components/portable-text-renderer";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { PAGE_QUERYResult } from "@/sanity.types";

type ContactFormProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "contactform" }
>;

function ContactForm({
  title,
  description,
  button_text,
  side_image,
}: ContactFormProps) {
  let imageUrl =
    side_image && side_image.asset?._id ? urlFor(side_image).url() : "";
  let captchaRef = useRef<ReCAPTCHA>(null);

  let [isVerified, setIsverified] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    business_name: "",
    request: "",
    description: "",
  });

  function handleSubmit(e: any) {
    e.preventDefault();

    if (!isVerified) {
      toast("Verifica reCAPTCHA fallita, Per favore, completa il reCAPTCHA.");
      return;
    }

    fetch("/api/contactform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        surname: formData.surname,
        business_name: formData.business_name,
        request: formData.request,
        description: formData.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast(
          "Richiesta di contatto registrata con successo, a breve verrà contattato da uno dei nostri operatori"
        );
      });
  }

  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    const request = fetch("/api/captcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const response = await request;
    if (response.ok) {
      setIsverified(true);
    } else {
      setIsverified(false);
    }
  }

  return (
    <Dialog>
      <div className="grid lg:grid-cols-2 bg-muted">
        <div
          className="bg-no-repeat bg-cover hidden lg:block"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "-15% 30%",
          }}></div>
        <div className="flex flex-col px-8 py-16 gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="lg:w-1/2">
            {description && <PortableTextRenderer value={description} />}
          </div>
          <DialogTrigger asChild className="lg:w-1/3">
            <Button>{button_text}</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contattaci</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="surname">Cognome</Label>
                <Input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="business_name">Azienda</Label>
                <Input
                  id="business_name"
                  type="text"
                  value={formData.business_name}
                  onChange={(e) =>
                    setFormData({ ...formData, business_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="request">Richiesta</Label>
                <Input
                  id="request"
                  type="text"
                  value={formData.request}
                  onChange={(e) =>
                    setFormData({ ...formData, request: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleCaptchaSubmission}
                />
                <p className="text-xs my-2">
                  Cliccando "Invia" si dichiara di aver preso visione
                  dell’informativa per il trattamento dei dati personali.
                </p>
              </div>

              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={handleSubmit}>
                Invia
              </Button>
            </div>
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </div>
    </Dialog>
  );
}
export default ContactForm;
