"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { CATEGORY_LIST } from "@/lib";
import { Payload } from "@/types/payload";
import { getFormData } from "@/utils/convertJSONToFormData";
import moment from "moment";
import { useState } from "react";

export default function FormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<Payload>({
    nama_lengkap: "",
    no_whatsapp: "",
    is_join_cg: false,
    age_category: "umum",
  });
  const handleSubmit = () => {
    setLoading(true);
    const submitted = {
      "Nama Lengkap": form.nama_lengkap,
      "No. Whatsapp": form.no_whatsapp,
      "Sudah/Belum ikut CG": form.is_join_cg ? "Sudah" : "Belum",
      Kategori: form.age_category,
      "Submitted Date": moment(new Date()).format(`YYYY-MM-DD`),
    };
    const payload = getFormData(submitted);
    fetch(
      "https://script.google.com/macros/s/AKfycbzoxk5F-zHF6x3b_dPZq19sehTC1yYfvIQgEkBxi649k8hhFfLHIzBk1yQqbeyyyXbM/exec",
      {
        mode: "no-cors",
        method: "POST",
        body: payload,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": "true",
          "Upgrade-Insecure-Requests": "1",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        alert("successfully submit");
        console.log("SUCCESSFULLY SUBMITTED");
        setForm({
          nama_lengkap: "",
          no_whatsapp: "",
          is_join_cg: false,
          age_category: "umum",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <main
      className={`flex flex-col items-center justify-center p-6 min-h-screen text-white`}
    >
      <div className={`w-full bg-accents text-white py-3 rounded-lg `}>
        <p className={`text-center font-semibold`}>CONNECT ME</p>
      </div>
      <div className={`w-full mt-6 flex flex-col gap-4`}>
        <Input
          value={form.nama_lengkap}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, nama_lengkap: e.target.value }));
          }}
          label={`Nama`}
          placeholder={`Masukkan nama anda`}
        />
        <Input
          prefix={`+62`}
          label={`Nomor Whatsapp`}
          placeholder={`Masukkan no. whatsapp`}
          value={form.no_whatsapp}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, no_whatsapp: e.target.value }));
          }}
        />
        <div>
          <label className={`mb-2`}>Kategori</label>
          <select
            value={form.age_category}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, age_category: e.target.value }));
            }}
            className={`bg-[#202020] mt-2 border border-white border-opacity-30 w-full  flex items-center rounded-lg focus-within:border-opacity-70 px-4 py-3`}
          >
            {CATEGORY_LIST.map((rows, index) => (
              <option key={index} value={rows.value}>
                {rows.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sudah join CG?</label>
          <div className={`flex mt-3`}>
            <input
              required
              hidden
              id={`join_cg`}
              name={`is_join_cg`}
              checked={form.is_join_cg}
              type={`radio`}
              onChange={(e) => {
                if (e.target.checked) {
                  setForm((prev) => ({ ...prev, is_join_cg: true }));
                } else {
                  setForm((prev) => ({ ...prev, is_join_cg: false }));
                }
              }}
            />
            <label
              className={`flex items-center justify-center w-full  py-3 rounded-l-md border-r border-opacity-20 border-gray-500 ${
                form.is_join_cg ? `bg-accents` : `bg-[#202020]`
              }`}
              htmlFor={`join_cg`}
            >
              Sudah
            </label>
            <input
              required
              hidden
              type={`radio`}
              id={`no_join_cg`}
              name={`is_join_cg`}
              value={`true`}
              onClick={() => {
                setForm((prev) => ({ ...prev, is_join_cg: false }));
              }}
              checked={!form.is_join_cg}
              className={`w-full  py-3 rounded-r-md ${
                !form.is_join_cg ? `bg-accents` : `bg-[#202020]`
              }`}
            />
            <label
              className={`flex items-center justify-center w-full  py-3 rounded-r-md border-opacity-20 border-gray-500 ${
                !form.is_join_cg ? `bg-accents` : `bg-[#202020]`
              }`}
              htmlFor={`no_join_cg`}
            >
              Belum
            </label>
          </div>
        </div>
      </div>
      <div className={`mt-6 w-full`}>
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </main>
  );
}
