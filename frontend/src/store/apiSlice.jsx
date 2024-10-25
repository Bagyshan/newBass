import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { KEY_REFRESH_TOKEN, KEY_TOKEN, KEY_USER } from './general';
// Создаем экземпляр Axios
const instance = axios.create({
  baseURL: 'http://34.46.230.115/api/',
});
const axiosInstance = axios.create({
    baseURL: 'http://34.46.230.115/api/',
  });
// Интерсептор для добавления токена в заголовок запроса
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(KEY_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const register = createAsyncThunk(
    "api/register",
    async ({user, navigateToLogin}, { rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`http://34.46.230.115/api/register/`,user);
            navigateToLogin();
            return response.data;
        } catch (error) {
            console.log(user)
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const login = createAsyncThunk(
    "api/login",
    async ({user,navigateToMainPage}, { rejectWithValue }) => {
        // const formData = new URLSearchParams();
        //     formData.append('email', user.email);
        //     formData.append('password', user.password);
        try {
            
            const response = await axiosInstance.post(`http://34.46.230.115/api/login/`, {
                email: user.email,
                password: user.password
            });
            console.log(response)
            // Извлекаем токены (access и refresh), если сервер их возвращает
            const { access, refresh } = response.data;

            // Сохраняем токены в localStorage
            localStorage.setItem(KEY_TOKEN, access);
            localStorage.setItem(KEY_REFRESH_TOKEN, refresh);
            navigateToMainPage();
            // Возвращаем полученные данные для использования в вашем store
            return response.data;
        } catch (error) {
            console.error("Ошибка логина:", error);
            console.log(user)
            // Проверяем, есть ли ответ от сервера с сообщением об ошибке
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || "Ошибка сервера");
            }

            // Если ошибка произошла до ответа от сервера (например, сеть недоступна)
            return rejectWithValue(error.message || "Неизвестная ошибка");
        }
    }
);
export const getCategories = createAsyncThunk(
    "api/getCategories",
    async (_, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/categories/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "api/getCurrentUser",
    async (_, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/current_user/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getUser = createAsyncThunk(
    "api/getUser",
    async (userId, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getFavorites = createAsyncThunk(
    "api/getFavorites",
    async (_, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/favorites/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getPosts = createAsyncThunk(
    "api/getPosts",
    async (_, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/posts/`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getPostsByCategory = createAsyncThunk(
    "api/getPostsByCategory",
    async (categoryId, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/posts/by-category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            console.log(categoryId)
            return rejectWithValue(error.message);
        }
    }
);
export const getPostsByDate = createAsyncThunk(
    "api/getPostsByDate",
    async (_, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/posts/by-date`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);
export const getPost = createAsyncThunk(
    "api/getPost",
    async (postId, { rejectWithValue}) => {
        try {
            const response = await instance.get(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk(
    "api/createPost",
    async ({newPost, navigateToMainPage}, { rejectWithValue}) => {
        try {
            const response = await instance.post(`/posts/create/`, newPost);
            navigateToMainPage()
            return response.data;
        } catch (error) {
            console.log(error);
            console.log(newPost)
            return rejectWithValue(error.message);
        }
    }
);
const initialState = {
    token: localStorage.getItem(KEY_TOKEN) || null,
    user: JSON.parse(localStorage.getItem(KEY_USER)) || null,
    loading: false,
    posts:[],
    categories:[],
    postsByCategory: [],
    post:[],
    currentUser:[],
    favorites:[],
  };

const apiSlice = createSlice({
    name: "api",
    initialState: initialState,
    reducers: {
      saveUserData: (state, { payload }) => {
        state.token = payload?.access_token;
        state.user = payload?.user;
        localStorage.setItem(KEY_TOKEN, payload?.access_token);
        localStorage.setItem(KEY_USER, JSON.stringify(payload?.user));
      },
      logout(state) {
        state.token = null;
        state.user = null;
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(KEY_USER);
      },
      clearPost: (state) => {
        state.post = [];
    },
    },
    extraReducers: (builder) => {
       builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.posts = payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPostsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostsByCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.postsByCategory = payload;
            })
            .addCase(getPostsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavorites.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.favorites = payload;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.post = payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.currentUser = payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categories = payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default apiSlice.reducer;