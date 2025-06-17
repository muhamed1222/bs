import { Block } from '@/shared/types/block';
import { supabase } from '@/shared/api/supabase';

class BlockService {
  async getBlocks(): Promise<Block[]> {
    const { data, error } = await supabase
      .from('blocks')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data as Block[];
  }

  async createBlock(block: Omit<Block, 'id'>): Promise<Block> {
    const { data, error } = await supabase
      .from('blocks')
      .insert([block])
      .select()
      .single();

    if (error) throw error;
    return data as Block;
  }

  async updateBlock(block: Block): Promise<Block> {
    const { data, error } = await supabase
      .from('blocks')
      .update(block)
      .eq('id', block.id)
      .select()
      .single();

    if (error) throw error;
    return data as Block;
  }

  async deleteBlock(blockId: string): Promise<void> {
    const { error } = await supabase
      .from('blocks')
      .delete()
      .eq('id', blockId);

    if (error) throw error;
  }

  async updateBlocksOrder(blocks: Block[]): Promise<void> {
    const updates = blocks.map((block, index) => ({
      id: block.id,
      order: index,
    }));

    const { error } = await supabase
      .from('blocks')
      .upsert(updates);

    if (error) throw error;
  }
}

export const blockService = new BlockService(); 