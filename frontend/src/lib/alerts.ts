"use client";

import Swal from "sweetalert2";

const baseOptions = {
  confirmButtonColor: "#0f9aa8",
  cancelButtonColor: "#ef8354",
  background: "#fffaf5",
  color: "#23111f",
};

export async function showConfirmAlert(options: {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  icon?: "warning" | "question" | "info";
}) {
  return Swal.fire({
    ...baseOptions,
    icon: options.icon ?? "warning",
    title: options.title,
    text: options.text,
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText,
    cancelButtonText: options.cancelButtonText ?? "Cancelar",
    reverseButtons: true,
  });
}

export async function showSuccessAlert(title: string, text?: string) {
  return Swal.fire({
    ...baseOptions,
    icon: "success",
    title,
    text,
    confirmButtonText: "Entendido",
  });
}

export async function showErrorAlert(title: string, text?: string) {
  return Swal.fire({
    ...baseOptions,
    icon: "error",
    title,
    text,
    confirmButtonText: "Cerrar",
  });
}
