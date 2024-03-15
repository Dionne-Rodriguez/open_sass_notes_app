import {describe, test, vi, expect} from 'vitest';
import {useAuth} from 'wasp/client/auth';
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../auth/LoginPage';

vi.mock('wasp/client/auth', () => ({
    useAuth: vi.fn(),
    LoginForm: vi.fn(() => <div>LoginForm Mock</div>)
}))

console.log(useAuth, 'Check here!!!')

describe('Tests for LoginPage', () => {
    test('LoginPage should render', async () => {
        vi.mocked(useAuth).mockImplementation(() => ({
            data: null,
        }) as any);

        render(
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        )

        expect(screen.getByText(/don't have an account yet\?/i)).toBeInTheDocument()
    })
})