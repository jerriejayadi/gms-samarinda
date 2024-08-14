"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { CATEGORY_LIST } from "@/lib";
import { Payload } from "@/types/payload";
import { useState } from "react";

export default function FormPage() {
  const [form, setForm] = useState<Payload>({
    fullname: "",
    whatsapp_number: "",
    is_join_cg: false,
    age_category: "",
  });
  return (
    <main
      className={`flex flex-col items-center justify-center p-6 min-h-screen text-white`}
    >
      <div className={`w-full bg-accents text-white py-3 rounded-lg `}>
        <p className={`text-center font-semibold`}>CONNECT ME</p>
      </div>
      <div className={`w-full mt-6 flex flex-col gap-4`}>
        <Input
          value={form.fullname}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, fullname: e.target.value }));
          }}
          label={`Nama`}
          placeholder={`Masukkan nama anda`}
        />
        <Input
          prefix={`+62`}
          label={`Nomor Whatsapp`}
          placeholder={`Masukkan no. whatsapp`}
          value={form.whatsapp_number}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, whatsapp_number: e.target.value }));
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
        <Button>Submit</Button>
      </div>
    </main>
  );
}
