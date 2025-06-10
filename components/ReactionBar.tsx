// Панель реакций
import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

}

const DEFAULT_EMOJIS = ['👍', '❤️', '😂'];


          {e} {data.reactions[e] || 0}
        </button>
      ))}
    </div>
  );
};

// Простая панель реакций с подсчётом лайков
