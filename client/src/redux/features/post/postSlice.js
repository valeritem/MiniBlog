import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
}

export const createPost = createAsyncThunk(
    'post/createPost',
    async (params, { rejectWithValue }) => {
        try {
            
            const existing = JSON.parse(localStorage.getItem('posts')) || []

            const newPost = {
                id: Date.now(),
                ...params,
                views: 0,
                comments: [],
                createdAt: new Date().toISOString(),
            }

            const updated = [newPost, ...existing]
            localStorage.setItem('posts', JSON.stringify(updated))

            return newPost
        } catch (error) {
            return rejectWithValue('Помилка при створенні поста')
        }
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(createPost.pending, (state) => {
            state.loading = true
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.loading = false
            state.posts.unshift(action.payload)
        })
        .addCase(createPost.rejected, (state) => {
            state.loading = false
        })
}
    } )