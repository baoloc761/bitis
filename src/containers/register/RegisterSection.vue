<template>
  <section class="bg-bluePrimary pt-20 pb-15">
    <div
      class="flex flex-col md:flex-row items-center gap-4 justify-center"
    >
      <!-- Left -->
      <div class="text-white text-center md:text-left">
        <h3
          class="flex items-center justify-center md:justify-end gap-2 font-semibold text-[20px]"
        >
          <img
            src="/images/send.svg"
            alt="send icon"
            class="w-5 h-5 object-contain"
          />
          Đăng ký nhận bản tin
        </h3>
        <p class="text-sm mt-1">
          Để nhận các thông tin mới từ Biti's cùng như các chương trình khuyến mãi hấp dẫn
        </p>
      </div>

      <!-- Form -->
      <form
        @submit.prevent="submitForm"
        class="flex w-full md:w-[480px] h-[45px] bg-white overflow-hidden border border-gray-200"
      >
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="Vui lòng nhập email của bạn..."
          class="flex-1 px-4 text-gray-700 text-sm focus:outline-none"
        />
        <button
          type="submit"
          :disabled="loading"
          class="bg-bluePrimary px-[35px] text-white font-semibold hover:bg-[#153f8c] transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {{ loading ? "Đang gửi..." : "ĐĂNG KÝ" }}
        </button>
      </form>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      >
        <div
          class="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-[400px] text-center"
        >
          <h3
            class="text-lg font-semibold mb-2"
            :class="isSuccess ? 'text-green-600' : 'text-red-600'"
          >
            {{ isSuccess ? "🎉 Đăng ký thành công!" : "❌ Có lỗi xảy ra" }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{
              isSuccess
                ? "Cảm ơn bạn đã đăng ký nhận bản tin của Biti's!"
                : message
            }}
          </p>
          <button
            @click="showModal = false"
            class="bg-[#194FAE] text-white px-6 py-3 rounded-md font-medium hover:bg-[#153f8c] transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { registerNewsletter } from "@/services/rest/bitisContact.service";

const form = reactive({ email: "" });
const showModal = ref(false);
const isSuccess = ref(false);
const message = ref("");
const loading = ref(false);

const submitForm = async () => {
  if (!form.email) return;

  loading.value = true;
  message.value = "";

  try {
    const { success, message: msg } = await registerNewsletter(form.email);
    console.log("check-success", success);

    isSuccess.value = success;
    message.value = msg;
    if (success) form.email = "";
  } catch (err: any) {
    isSuccess.value = false;
    message.value = err.message || "Không thể gửi đăng ký.";
  } finally {
    loading.value = false;
    showModal.value = true;
  }
};

</script>
