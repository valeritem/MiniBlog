import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }, thunkAPI) => {
    try {

      await new Promise((resolve) => setTimeout(resolve, 500))

      const data = {
        message: 'Реєстрація успішна!',
        user: { username },
        token: 'fake-token-123',
      }

      window.localStorage.setItem('token', data.token)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Помилка реєстрації' })
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (username === 'admin' && password === '12345') {
        const data = {
          message: 'Вхід успішний!',
          user: { username: 'admin' },
          token: 'fake-token-123',
        }
        window.localStorage.setItem('token', data.token)
        return data
      } else {
        return thunkAPI.rejectWithValue({ message: 'Невірний логін або пароль' })
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Помилка входу' })
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const token = window.localStorage.getItem('token')

      if (!token) {
        return thunkAPI.rejectWithValue({ message: 'Користувача не знайдено' })
      }

      return {
        user: { username: 'admin' },
        token,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: 'Помилка при перевірці користувача' })
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoading = false
      state.status = 'Вихід виконано'
      window.localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.status = action.payload?.message || 'Помилка реєстрації'
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.status = action.payload?.message || 'Помилка входу'
      })

      // GET ME
      .addCase(getMe.pending, (state) => {
        state.isLoading = true
        state.status = null
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false
        state.status = action.payload?.message || 'Користувача не знайдено'
      })
  },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions
export default authSlice.reducer
