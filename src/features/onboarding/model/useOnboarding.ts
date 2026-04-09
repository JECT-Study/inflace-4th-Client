import { useMutation } from '@tanstack/react-query'
import { postOnboarding } from '../api/onboardingApi'

export const useOnboarding = () =>
  useMutation({
    mutationFn: postOnboarding,
  })
