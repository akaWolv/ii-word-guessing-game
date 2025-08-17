import { GameSetup, GameSetupOption } from 'interfaces'
import axios from 'axios'

const useGameSetupManager = () => {
  const getSetupPreferences = async (): Promise<GameSetup> => {
    const allOptions = (await axios.get(`/api/setup`).then((response) => response.data)).data
    let parsedOptions: GameSetup = {
      availableCategories: [],
      availableWordListSizes: [],
      availableTimes: []
    }

    allOptions.forEach(({ name, value, type, order }: GameSetupOption) => {
      parsedOptions[type as keyof typeof parsedOptions].push({ name, value, type, order })
    });

    return parsedOptions
  }

  return {
    getSetupPreferences,
  }
}


export default useGameSetupManager
