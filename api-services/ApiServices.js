import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { Alert } from "react-native";
import { getApi, postApi, deleteApi, putApi } from "./HttpClient";

export async function sendOtpForLogin(phone, isLogin) {
  const body = { phone: phone, isLogin: isLogin };
  return await postApi("/signup", body);
}
export async function validateOtpForSignUp(
  phone,
  code,
  firstName,
  lastName,
  email
) {
  const body = {
    phone: phone,
    code,
    firstname: firstName,
    lastname: lastName,
    email,
  };
  return await postApi("/verify", body);
}

export async function validateOtpForLogin(phone, code) {
  const body = { phone: phone, code: code };
  return await postApi("/login", body);
}
export async function getAllUserBookings(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await getApi("/mybookings", headers);
}
export async function getUserDetails(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await getApi("/user", headers);
}

export async function getBookingDetails(token, id) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const query = {
    id: id,
  };
  return await getApi("/onebooking", headers, query);
}
export async function socketsInRange(token, coords) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = {
    location: {
      coordinates: coords,
    },
  };

  return await postApi("/sockets", body, headers);
}
export async function createBooking(token, socketId) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = {
    socket: socketId,
  };

  return await postApi("/booking/create", body, headers);
}
export async function cancelMyBooking(token, bookingId) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const query = {
    id: bookingId,
  };

  return await putApi("/booking/cancel", null, headers, query);
}
export async function startCharging(token, bookingId, startTime) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const query = {
    id: bookingId,
  };
  const body = {
    status: "Ongoing",
    startTime: startTime,
  };

  return await putApi("/booking/update", body, headers, query);
}
export async function stopCharging(token, bookingId, endTime) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const query = {
    id: bookingId,
  };
  const body = {
    status: "Completed",
    cost: 100,
    units: 10,
    endTime: endTime,
  };

  return await putApi("/booking/update", body, headers, query);
}

export function validateNames(name, required) {
  name = name.trim();
  if (required && !name) {
    return false;
  }
  if (!required && !name) {
    return true;
  }
  let letters = /^[A-Za-z]+$/;
  return letters.test(name) && name.length > 2;
}
export function validateEmail(email) {
  email = email.trim();
  if (!email) {
    return true;
  }
  email = email.toLowerCase();
  let letters = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return letters.test(email);
  //email.match(letters);
}
export function validatePhone(phone) {
  phone = phone.trim();
  let letters = /^[6-9]\d{9}$/;
  return letters.test(phone);
}
